import mongoose from 'mongoose';
import crypto from 'crypto';

// const crypto = require('crypto');
// 'mongodb+srv://Frankie:2WDfusf3oD7ERjhY@cluster0-eo9g7.mongodb.net/sky'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, max: 100},
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    resetLink: { data: String, default: ''},
    resetToken: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;