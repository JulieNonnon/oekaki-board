import express from "express";
import cors from "cors";
import drawingsRoutes from "./modules/drawings/drawings.routes";

// Point d'entrée de l'application : configure Express, les middlewares et les routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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