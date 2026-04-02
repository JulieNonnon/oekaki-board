import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.get("/", (req, res) => {
  res.send("API Oekaki running");
});
// npm run dev : consulter http://localhost:4000/ pour vérifier que le serveur fonctionne

export default app;