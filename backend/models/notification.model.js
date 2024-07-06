import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["FOLLOW", "COMMENT", "LIKE"],
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", userSchema);

export default Notification;
