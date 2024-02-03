const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userNameChecker = require("./router/events/userNameChecker");
const getCategories = require("./router/events/getCategory");
const getCity = require("./router/events/getCity");
const registerRouter = require("./router/auth/register");
const createSellerRouter = require("./router/events/createSeller");
const newPost = require("./router/events/newPost");
const logedChecking = require("./middleware/jwt/logedChecking");
const wsChecker = require("./bot/wsCheck");
const userSettings = require("./router/userSettings/userSettings");
const editUser = require("./router/userSettings/editUser");
const loginRouter = require("./router/auth/login");
const logoutRouter = require("./router/auth/logout");
const uploadRouter = require("./router/events/imgUpload");

const connection = require("./database/connection");

const app = express();
require("dotenv").config();

const port = process.env.PORT;
const sessionMiddleware = session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(sessionMiddleware);

app.use("/uploads", express.static("uploads"));

// ? userName checker
app.use("/check", userNameChecker);
// ? get categories
app.use("/get", getCategories);
// ? get city's
app.use("/get", getCity);
// ? register
app.use("/register", registerRouter);
// ? create seller
app.use("/new", createSellerRouter);
// ? new post
app.use("/new", newPost);
// ? login
app.use("/login", loginRouter);
// ? logout
app.use("/logout", logoutRouter);
// ? loged checking
app.use("/jwt", logedChecking);
// ? ws Check
app.use("/ws", wsChecker);
// ? user settings
app.use("/usersettings", userSettings);
// ? edit user
app.use("/edit/user", editUser);
//  ? uploads
app.use("/upload", uploadRouter);

// * test
const online = [
  {
    name: "Marketing Numérique",
    subcategories: [
      { name: "Optimisation pour les Moteurs de Recherche (SEO)" },
      { name: "Marketing sur les Réseaux Sociaux" },
      { name: "Marketing par Email" },
      { name: "Marketing de Contenu" },
      { name: "Publicité au Paiement par Clic (PPC)" },
      { name: "Marketing d'Affiliation" },
    ],
  },
  {
    name: "Développement Web",
    subcategories: [
      { name: "Conception de Site Web" },
      { name: "Développement Frontal" },
      { name: "Développement Back-end" },
      { name: "Développement E-commerce" },
      { name: "Développement d'Applications Web" },
      { name: "Développement de Systèmes de Gestion de Contenu (CMS)" },
    ],
  },
  {
    name: "Design Graphique",
    subcategories: [
      { name: "Conception de Logo" },
      { name: "Conception d'Identité de Marque" },
      { name: "Conception UI/UX" },
      { name: "Design Graphique Impression" },
      { name: "Illustration" },
      { name: "Graphiques Animés" },
    ],
  },
  {
    name: "Logiciels en tant que Service (SaaS)",
    subcategories: [
      { name: "Outils de Gestion de Projet" },
      { name: "Gestion de la Relation Client (CRM)" },
      { name: "Logiciels de Comptabilité" },
      { name: "Gestion des Ressources Humaines (GRH)" },
      { name: "Automatisation du Marketing" },
      { name: "Outils de Collaboration" },
    ],
  },
  {
    name: "Apprentissage en Ligne",
    subcategories: [
      { name: "Cours de Programmation" },
      { name: "Cours d'Affaires" },
      { name: "Apprentissage des Langues" },
      { name: "Cours d'Art et de Design" },
      { name: "Cours de Développement Personnel" },
      { name: "Cours de Cuisine et Culinaire" },
    ],
  },
  {
    name: "Services de Rédaction et de Traduction",
    subcategories: [
      { name: "Rédaction de Contenu Web" },
      { name: "Rédaction Technique" },
      { name: "Traduction de Documents" },
      { name: "Services de Correction et de Révision" },
    ],
  },
  {
    name: "Services de Consultation en Ligne",
    subcategories: [
      { name: "Consultation en Stratégie d'Entreprise" },
      { name: "Consultation Financière" },
      { name: "Consultation en Marketing" },
      { name: "Consultation en Ressources Humaines" },
    ],
  },
  {
    name: "Services de Santé en Ligne",
    subcategories: [
      { name: "Consultation Médicale en Ligne" },
      { name: "Conseil en Nutrition" },
      { name: "Coaching en Santé et Bien-être" },
      { name: "Services de Psychologie en Ligne" },
    ],
  },
  {
    name: "Services de Design",
    subcategories: [
      { name: "Design d'Intérieur en Ligne" },
      { name: "Conception de Meubles sur Mesure" },
      { name: "Design de Mode et Accessoires" },
      { name: "Design Industriel" },
      { name: "Design Architectural" },
      { name: "Design de Produit" },
    ],
  },
  {
    name: "Services de Voyages et de Tourisme",
    subcategories: [
      { name: "Réservation de Vols" },
      { name: "Réservation d'Hôtels" },
      { name: "Forfaits de Vacances" },
      { name: "Excursions et Activités" },
      { name: "Services de Location de Voiture" },
      { name: "Guides de Voyage Personnalisés" },
    ],
  },
  {
    name: "Services de Divertissement en Ligne",
    subcategories: [
      { name: "Streaming de Musique" },
      { name: "Vidéo à la Demande (VOD)" },
      { name: "Jeux en Ligne" },
      { name: "E-books et Lecture en Ligne" },
      { name: "Plateformes de Podcast" },
      { name: "Diffusion de Spectacles en Ligne" },
    ],
  },
];

const categoryOSchema = require("./schema/category/categoryOSchema");
app.get("/test", async (req, res) => {
  online.map((mov, i) => {
    categoryOSchema.create();
  });
});

// !!
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
