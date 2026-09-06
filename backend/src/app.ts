import express from "express";
import cors from "cors";
import drawingsRoutes from "./modules/drawings/drawings.routes";

// Point d'entrée de l'application : configure Express, les middlewares et les routes
const app = express();

// Middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "5mb" })); // ⚠️ solution temporaire pour gérer les images encodées en base64 avec de longues chaînes de caractères (limite de 5mo) pour éviter l'erreur "Payload too large" lors de l'envoi d'images encodées en base 64 depuis le frontend vers le backend. Envisager une solution plus robuste à l'avenir comme le stockage des images sur un service de stockage externe (ex: AWS S3, Cloudinary) et l'envoi d'URL vers ces images plutôt que d'envoyer les images encodées en base 64 directement dans les requêtes HTTP.

// Routes
app.use("/drawings", drawingsRoutes);


// CORS : autoriser le frontend (http://localhost:3000) à faire des requêtes à notre API (http://localhost:4000)
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

// Route de test pour vérifier que le serveur fonctionne
// npm run dev : consulter http://localhost:4000/ pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("API Oekaki running");
});

export default app;