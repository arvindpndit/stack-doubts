import { Schema, model, Document, Model, models } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const tagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

// 3. Create a Model.
const Tag: Model<ITag> = models.Tag || model("Tag", tagSchema);

export default Tag;
