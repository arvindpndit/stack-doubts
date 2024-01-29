import { Schema, models, model, Document, Model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

// 3. Create a Model.
const User: Model<IUser> = models.User || model("User", userSchema);

export default User;
