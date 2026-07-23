import mongoose, { Schema, type Document, type Types } from 'mongoose'

export interface IPost extends Document {
  title: string
  author: Types.ObjectId
  contents?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
  },
  {
    timestamps: true,
  },
)

export const Post = mongoose.model<IPost>('post', postSchema)
