require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONECTION_URL, { dbName: "CasaChores" })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Connection error:", err);
    process.exit(1);
  });

const citySchema = new mongoose.Schema({
  region: { type: String, required: true },
  name: { type: String, required: true },
});
const City = mongoose.model("City", citySchema);

const categoryOSchema = new mongoose.Schema({
  typeCat: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  subCategory: [{ name: { type: String, required: true, unique: true } }],
});
const CategoryO = mongoose.model("CategoryO", categoryOSchema, "categoryO");

const categoryPSchema = new mongoose.Schema({
  typeCat: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  subCategory: [
    {
      name: { type: String, required: true, unique: true },
      subCategory: [{ name: { type: String, required: true, unique: true } }],
    },
  ],
});
const CategorieP = mongoose.model("CategorieP", categoryPSchema, "categorieP");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  birth: { type: Date, required: true },
  seller: { type: Boolean, default: false },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});
const User = mongoose.model("User", userSchema);

const sellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shopName: String,
});
const Seller = mongoose.model("Seller", sellerSchema);

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
});
const Post = mongoose.model("Post", postSchema);

const prePostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  step0: { city: String, adresse: String, phone: String, hiddenPhone: Boolean },
  step1: {
    mainCat: String,
    subCat: String,
    title: String,
    description: String,
  },
  step2: { favIndex: Number, imgUrl: [String] },
});
const PrePost = mongoose.model("PrePost", prePostSchema);

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: String,
  file: String,
  timestamp: { type: Date, default: Date.now },
});
const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [messageSchema],
});
const Chat = mongoose.model("Chat", chatSchema);

const wsCodeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  phone: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});
const WsCode = mongoose.model("WsCode", wsCodeSchema);
