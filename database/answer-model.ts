import { Schema, model, Document, Model, models } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IAnswer extends Document {
  description: string;
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId[];
  createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const answerSchema = new Schema<IAnswer>({
  description: { type: String, required: true },
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  question: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
});

// 3. Create a Model.
const Answer: Model<IAnswer> = models.Answer || model("Answer", answerSchema);

export default Answer;
