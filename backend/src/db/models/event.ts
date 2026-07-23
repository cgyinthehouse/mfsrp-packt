import mongoose, { Schema, type Document, type Types } from 'mongoose'

export interface IEvent extends Document {
  post: Types.ObjectId
  session: string
  action: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

const eventSchema = new Schema<IEvent>(
  {
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    session: { type: String, required: true },
    action: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
)

export const Event = mongoose.model<IEvent>('event', eventSchema)
