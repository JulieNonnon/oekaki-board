// Gère les requêtes HTTP (req / res)
// Backend temporaire pour tester les routes et la connexion à la base de données

import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

// ✅ Liste
export const getDrawings = async (req: Request, res: Response) => {
  try {
    const drawings = await prisma.drawing.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(drawings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching drawings" });
  }
};

// ✅ Détail (CORRIGÉ)
export const getDrawingById = async (
  req: Request,
  res: Response
) => {
  try {

    const id = req.params.id;
    
    // sécurité optionnelle : on vérifie que l'id n'est pas un tableau (ce qui pourrait arriver si la route est mal utilisée ou si un bot tente d'exploiter la route)
    if (Array.isArray(id)) {
      return res.status(400).json({
        error: "Invalid id format"
      });
    }

    console.log("PARAM ID:", id);

    const drawing =
      await prisma.drawing.findUnique({
        where: { id }
      });

    console.log("FOUND DRAWING:", drawing);

    if (!drawing) {
      return res.status(404).json({
        error: "Drawing not found"
      });
    }

    res.json(drawing);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error fetching drawing"
    });
  }
};

// ✅ Création
export const createDrawing = async (req: Request, res: Response) => {
  try {
    const { title, imageBase64 } = req.body;

    if (!title || !imageBase64) {
      return res.status(400).json({ error: "Missing data" });
    }

    const drawing = await prisma.drawing.create({
      data: {
        title,
        imageUrl: imageBase64
      }
    });

    res.status(201).json(drawing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating drawing" });
  }
};

    // Note : on stocke directement le base64 dans imageUrl pour simplifier, c'est temporaire pour le MVP (plus tard -> S3 ou stockage local + URL  dans la base de données )

