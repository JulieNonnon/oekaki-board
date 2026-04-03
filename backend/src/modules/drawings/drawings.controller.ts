// Gère les requêtes HTTP (req / res)
// Backend temporaire pour tester les routes et la connexion à la base de données

import { Request, Response } from "express";

export const getDrawings = async (req: Request, res: Response) => {
  // ⚠️ données temporaires pour tester le frontend
  const fakeDrawings = [
    {
      id: "1",
      title: "Mon premier dessin",
      imageUrl: "https://via.placeholder.com/200",
      createdAt: new Date().toISOString(),
      author: {
        id: "1",
        username: "alice"
      },
      likesCount: 3,
      commentsCount: 1
    },
    {
      id: "2",
      title: "Petit chat",
      imageUrl: "https://via.placeholder.com/200",
      createdAt: new Date().toISOString(),
      author: {
        id: "2",
        username: "bob"
      },
      likesCount: 5,
      commentsCount: 2
    }
  ];

  res.json({
    data: fakeDrawings
  });
};