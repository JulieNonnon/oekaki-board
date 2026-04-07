// Gère les requêtes HTTP (req / res)
// Backend temporaire pour tester les routes et la connexion à la base de données

import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getDrawings = async (req: Request, res: Response) => {
  const drawings = await prisma.drawing.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(drawings);
};

// export const getDrawings = async (req: Request, res: Response) => {
//   // ⚠️ données temporaires pour tester le frontend
//     const fakeDrawings = [
//         {
//         id: "1",
//         title: "Mon premier dessin",
//         imageUrl: "https://via.placeholder.com/200",
//         createdAt: new Date().toISOString(),
//         author: {
//             id: "1",
//             username: "alice"
//         },
//         likesCount: 3,
//         commentsCount: 1
//         },
//         {
//         id: "2",
//         title: "Petit chat",
//         imageUrl: "https://via.placeholder.com/200",
//         createdAt: new Date().toISOString(),
//         author: {
//             id: "2",
//             username: "bob"
//         },
//         likesCount: 5,
//         commentsCount: 2
//         }
//     ];

//         res.json({
//             data: fakeDrawings
//         });
//     };

    export const getDrawingById = async (req: Request, res: Response) => {
        const { id } = req.params;

        // fake data pour test
        const drawing = {
            id,
            title: "Mon dessin détaillé",
            imageUrl: "https://via.placeholder.com/600",
            createdAt: new Date().toISOString(),
            author: {
            id: "1",
            username: "alice"
            },
            likesCount: 10,
            commentsCount: 2
        };

        res.json(drawing);
    };

    export const createDrawing = async (req: Request, res: Response) => {
        try {
            const { title, imageBase64 } = req.body;

            if (!title || !imageBase64) {
            return res.status(400).json({ error: "Missing data" });
            }

            const drawing = await prisma.drawing.create({
            data: {
                title,
                imageUrl: imageBase64 // MVP : on stocke direct
            }
            });

            res.status(201).json(drawing);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating drawing" });
        }
    };
    // Note : on stocke directement le base64 dans imageUrl pour simplifier, c'est temporaire pour le MVP (plus tard -> S3 ou stockage local + URL  dans la base de données )

