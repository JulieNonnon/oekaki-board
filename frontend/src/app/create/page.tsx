// page de dessin / canvas

"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function CreatePage() {

  // Références et états pour gérer le dessin sur le canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

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

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  // Arrêter de dessiner quand la souris est relâchée ou quitte le canvas
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Pour l’instant, on se contente de récupérer l’image au format data URL et de l’afficher dans la console.
  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

    console.log(dataUrl); // 👉 pour l’instant
};

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        🎨 Create Drawing
      </h1>
    
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border rounded cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mb-4"
      />

      <button
        onClick={saveImage}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
        Save
      </button>
    </main>
  );
}