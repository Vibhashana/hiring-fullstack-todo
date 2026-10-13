import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title must be 200 characters or less'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Description must be 1000 characters or less'],
    },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Todo', todoSchema);
