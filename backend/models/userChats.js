import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    chats: [
      {
        _id: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now // Không cần gọi hàm
        }
      }
    ]
  },
  { timestamps: true }
);

// Kiểm tra nếu model đã tồn tại, sử dụng lại model thay vì tạo mới
export default mongoose.models.UserChats ||
  mongoose.model("UserChats", userChatsSchema);
