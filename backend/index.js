import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { requireAuth } from "@clerk/express";

dotenv.config(); // Load biến môi trường từ file .env

const port = process.env.PORT || 3000;
const app = express();
// Cấu hình CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Đảm bảo CLIENT_URL được định nghĩa trong .env
    credentials: true
  })
);

app.use(express.json());
// app.use(clerkMiddleware());
// Kết nối MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Cấu hình ImageKit
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

// Endpoint để trả về tham số xác thực của ImageKit
app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// app.get("/api/test",requireAuth(), async (req, res) => {
//   const userId = req.auth.userId
//   console.log(userId);
//   res.send("success!")

// })

app.post("/api/chats", requireAuth(), async (req, res) => {
  const { text } = req.body;
  const userId = req.auth.userId;

  try {
    // Tạo chat mới
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }]
    });
    const saveChat = await newChat.save();

    // Kiểm tra nếu UserChats tồn tại
    const userChats = await UserChats.findOne({ userId: userId });

    if (!userChats) {
      // Nếu UserChats chưa tồn tại, tạo mới
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: saveChat._id,
            title: text.substring(0, 40)
          }
        ]
      });
      await newUserChats.save();
    } else {
      // Nếu tồn tại, thêm chat mới vào mảng
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: saveChat._id,
              title: text.substring(0, 40)
            }
          }
        }
      );
    }

    // Gửi phản hồi thành công
    res.status(201).send({ chatId: saveChat._id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating chat");
  }
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChats = await UserChats.find({ userId });

    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error feerching userchats");
  }
});
app.get("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
  }
});
app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const {question, answer, img} = req.body;
  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }, ...(img ? [{ img }] : [])] }]
      : []),
    { role: "model", parts: [{ text: answer }] }
  ];
  try {
    const updateChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems
          }
        }
      }
    );
    res.status(200).send(updateChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
});
// Lắng nghe cổng
app.listen(port, () => {
  connect(); // Kết nối MongoDB khi server khởi động
  console.log(`Server running on port ${port}`);
});
