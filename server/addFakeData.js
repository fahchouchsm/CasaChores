require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// ====== CONNECT ======
mongoose
  .connect(process.env.CONECTION_URL, { dbName: "CasaChores" })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    seedDatabase();
  })
  .catch((err) => {
    console.error("❌ Connection error:", err);
    process.exit(1);
  });

// ====== SCHEMAS & MODELS ======
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
  typeCat: { type: String, enum: ["O", "P"], required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "typeCat",
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

// ====== SEED FUNCTION ======
async function seedDatabase() {
  try {
    // Drop all collections safely
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    for (const coll of collections) {
      await mongoose.connection.db.dropCollection(coll.name);
    }

    // ===== Cities =====
    const cities = Array.from({ length: 10 }, () => ({
      name: faker.location.city(),
      region: faker.location.state(),
    }));
    const insertedCities = await City.insertMany(cities);

    // ===== CategoryO =====
    const categoryOData = Array.from({ length: 5 }, (_, i) => ({
      typeCat: "O",
      name: `CategoryO-${i}`,
      subCategory: [{ name: `SubO-${i}-1` }, { name: `SubO-${i}-2` }],
    }));
    const insertedCategoryO = await CategoryO.insertMany(categoryOData);

    // ===== CategorieP =====
    const categoriePData = Array.from({ length: 5 }, (_, i) => ({
      typeCat: "P",
      name: `CategoryP-${i}`,
      subCategory: [
        { name: `SubP-${i}-1`, subCategory: [{ name: `SubSubP-${i}-1a` }] },
        { name: `SubP-${i}-2`, subCategory: [{ name: `SubSubP-${i}-2a` }] },
      ],
    }));
    const insertedCategorieP = await CategorieP.insertMany(categoriePData);

    // ===== Users =====
    const users = Array.from({ length: 20 }, () => ({
      email: faker.internet.email(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
      birth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
      seller: false,
      posts: [],
    }));
    const insertedUsers = await User.insertMany(users);

    // ===== Sellers =====
    const sellers = insertedUsers.slice(0, 10).map((user, i) => ({
      userId: user._id,
      shopName: `Shop-${i}-${faker.company.name()}`,
    }));
    const insertedSellers = await Seller.insertMany(sellers);

    // Update users as sellers
    const bulkOps = insertedSellers.map((seller) => ({
      updateOne: { filter: { _id: seller.userId }, update: { seller: true } },
    }));
    await User.bulkWrite(bulkOps);

    // ===== Posts =====
    const posts = Array.from({ length: 50 }, () => {
      const user = faker.helpers.arrayElement(insertedUsers);
      const seller = faker.helpers.arrayElement(insertedSellers);
      const city = faker.helpers.arrayElement(insertedCities);

      const typeCat = faker.helpers.arrayElement(["O", "P"]);
      const category =
        typeCat === "O"
          ? faker.helpers.arrayElement(insertedCategoryO)._id
          : faker.helpers.arrayElement(insertedCategorieP)._id;

      return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        location: city.name,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        user: user._id,
        seller: seller._id,
        typeCat,
        category,
      };
    });
    await Post.insertMany(posts);

    // ===== PrePosts =====
    const prePosts = insertedUsers.slice(0, 10).map((user) => ({
      user: user._id,
      step0: {
        city: faker.location.city(),
        adresse: faker.location.streetAddress(),
        phone: faker.phone.number(),
        hiddenPhone: false,
      },
      step1: {
        mainCat: "CategoryO-0",
        subCat: "SubO-0-1",
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      },
      step2: {
        favIndex: 1,
        imgUrl: [faker.image.urlLoremFlickr({ category: "city" })],
      },
    }));
    await PrePost.insertMany(prePosts);

    // ===== Chats =====
    const chats = Array.from({ length: 10 }, () => {
      const participants = faker.helpers
        .arrayElements(insertedUsers, 2)
        .map((u) => u._id);
      return {
        participants,
        messages: [
          {
            sender: participants[0],
            content: faker.lorem.sentence(),
            timestamp: new Date(),
          },
          {
            sender: participants[1],
            content: faker.lorem.sentence(),
            timestamp: new Date(),
          },
        ],
      };
    });
    await Chat.insertMany(chats);

    // ===== WsCode =====
    const wsCodes = insertedUsers.slice(0, 5).map((user) => ({
      userId: user._id.toString(),
      code: faker.string.alphanumeric(6).toUpperCase(),
      phone: faker.phone.number(),
    }));
    await WsCode.insertMany(wsCodes);

    console.log("🌱 Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}
