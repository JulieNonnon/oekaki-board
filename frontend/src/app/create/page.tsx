// page de dessin / canvas

// on active le mode client pour pouvoir utiliser les hooks React (useState, useRef, etc.) et gérer l’interactivité du canvas.
"use client"; 

import { useRef, useState } from "react";
import styles from "./page.module.css";
import { createDrawing } from "@/services/drawings";
import { useRouter } from "next/navigation";
import Link from "next/dist/client/link";
import { Modal } from "@/components/ui/Modal";

export default function CreatePage() {

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Références et états pour gérer le dessin sur le canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [title, setTitle] = useState("");
  const [hasDrawn, setHasDrawn] = useState(false);

  // Commencer à dessiner quand la souris est pressée sur le canvas
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;

    setIsDrawing(true);
  };

  // Dessiner quand la souris bouge et que le dessin est actif
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const ctx = canvasRef.current?.getContext("2d"); //ctx est le contexte de dessin du canvas, c'est lui qui nous permet de dessiner dessus.
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();

    setHasDrawn(true); // 👈 important
  };

  // Arrêter de dessiner quand la souris est relâchée ou quitte le canvas
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Vérifier si le canvas est vide (pas de dessin) avant de sauvegarder, pour éviter de créer des dessins vides dans la base de données.
  const isCanvasEmpty = () => {
    const canvas = canvasRef.current;
    if (!canvas) return true;

    const ctx = canvas.getContext("2d");
    if (!ctx) return true;

    const pixelBuffer = new Uint32Array(
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data.buffer
    );

    return !pixelBuffer.some((pixel) => pixel !== 0);
  };

  // Activer le bouton de sauvegarde seulement si le titre est rempli et qu'on a dessiné quelque chose.
  const canSave = title.trim().length > 0 && hasDrawn;

  // Pour l’instant, on se contente de récupérer l’image au format data URL et de l’afficher dans la console.
  const saveImage = async () => {
    const canvas = canvasRef.current;

    if (isCanvasEmpty()) {
      alert("Le dessin est vide.");
      return;
    }

    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

        try {
            const result = await createDrawing({
            title,
            imageBase64: dataUrl
            });

            console.log("Saved:", result);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
            alert("Error while saving");
        }
  };

  return (
    <main className="container">
      <h1>🎨 Create Drawing</h1>

      <Link href="/drawings">
        <button className="button">
          ↩️ Retour à l'accueil
        </button>
      </Link>
    
      <div className="card" style={{ padding: 16 }}>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="input"
      />
      
      <input
        type="text"
        placeholder="Titre du dessin"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
       />

      <button
        onClick={saveImage}
        disabled={!canSave}
        className={
          `button ${canSave 
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"}`
        }
      >
        Save
      </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="🎉 Dessin sauvegardé"
        message="Votre œuvre a bien été enregistrée."
        onClose={() => router.push("/drawings")}
      />
    </main>
  );
}