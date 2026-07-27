// page de dessin / canvas

// on active le mode client pour pouvoir utiliser les hooks React (useState, useRef, etc.) et gérer l’interactivité du canvas.
"use client"; 

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { createDrawing } from "@/services/drawings";
import { useRouter } from "next/navigation";
import Link from "next/dist/client/link";
import { Modal } from "@/components/ui/Modal";
import { ColorPalette } from "@/components/drawing/ColorPalette";

export default function CreatePage() {

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Références et états pour gérer le dessin sur le canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<"brush" | "eraser">("brush"); // pour gérer l’outil sélectionné (pinceau ou gomme), le pinceau est l’outil par défaut.
  const [history, setHistory] = useState<string[]>([]); // pour gestion de l’historique des actions de dessin (undo/redo)
  const [historyIndex, setHistoryIndex] = useState(-1); // pour suivre l’index actuel dans l’historique des actions de dessin
  
  // Initialiser l’historique avec l’état initial du canvas (vide) lors du montage du composant
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    setHistory([canvas.toDataURL()]);
    setHistoryIndex(0);

  }, []);

  // Fonction pour configurer le contexte du canvas selon l’outil sélectionné
  const configureContext = (ctx: CanvasRenderingContext2D) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "brush") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize; // 3px
    }
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 3;
    }
  };

  // Commencer à dessiner quand la souris est pressée sur le canvas
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    configureContext(ctx);

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // ctx.strokeStyle = color;

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
    if (isDrawing) {
      saveHistory(); // Sauvegarder l’état actuel du canvas dans l’historique pour permettre l’undo/redo
    }
    setIsDrawing(false);
  };

  // Sauvegarder l’état actuel du canvas dans l’historique pour permettre l’undo/redo
  const saveHistory = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const snapshot = canvas.toDataURL();

    // setHistory((prev) => [...prev, snapshot]);

    setHistory((prev) => { // On ne garde que l’historique jusqu’à l’index actuel pour éviter d’avoir des états "futurs" après un undo.
      const next = prev.slice(0, historyIndex + 1);
      next.push(snapshot);
      return next;
    });

    setHistoryIndex((prev) => prev + 1);
  };

  // Charger un état précédent du canvas depuis l’historique pour permettre l’undo/redo
  const loadHistory = (index: number) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const snapshot = history[index]; // Récupérer l’état du canvas à l’index spécifié dans l’historique

    if (!snapshot) return;

    const image = new Image(); // Créer un nouvel objet Image pour charger l’état du canvas depuis l’historique

    image.src = snapshot; // On lui assigne le base64 de l’état du canvas à l’index spécifié dans l’historique

    image.onload = () => { // Quand l’image est chargée, on peut la dessiner sur le canvas
      ctx.clearRect( // on nettoie le canvas avant de dessiner l’état précédent
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.drawImage( // puis on dessine l’image chargée sur le canvas
        image,
        0,
        0
      );
    };
  };

  // Fonction pour annuler la dernière action de dessin (undo)
  const undo = () => {
    if (historyIndex <= 0) return; // "Puis-je revenir en arrière ? Si je suis déjà au début de l’historique, je ne peux pas faire d’undo."

    const previousIndex = historyIndex - 1; // On calcule l’index précédent dans l’historique pour revenir en arrière.

    setHistoryIndex(previousIndex); // On met à jour l’index actuel dans l’historique pour refléter l’action d’undo.

    loadHistory(previousIndex); // Enfin, on recharge l’état du canvas correspondant à l’index précédent dans l’historique pour revenir en arrière.
  };

  // Fonction pour rétablir la dernière action de dessin annulée (redo)
  const redo = () => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;

    setHistoryIndex(nextIndex);

    loadHistory(nextIndex);
  };

  // Effacer l'entièreté du canva avec un "Clear All"
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx =canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
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

      <h2>⚠️ Cet Oekaki Board est développé dans un but pédagogique: merci de ne pas publier de contenu sensible, inapproprié ou diffamatoire.</h2>
      {/* <h2>Outil sélectionné : {tool}</h2> */}

      <Link href="/drawings">
        <button className="button">
          ↩️ Retour à l'accueil
        </button>
      </Link>
    
      <div className="card" style={{ padding: 16 }}>
        <div className={styles.canvasContainer}>
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
        </div>

      <div className={styles.canvasControls}>
        <label>
          Palette de couleurs :
        </label>
        <input
          title="Afficher la palette de couleurs"
          color="black"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="input"
        />

        <ColorPalette
          title="Sélectionner une couleur"
          selectedColor={color}
          onChange={setColor}
        />

        <div>
          <label>
            Taille du pinceau : {brushSize}px
          </label>

          <input
            title="Ajuster la taille du pinceau"
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) =>
              setBrushSize(Number(e.target.value))
            }
          />
        </div>

        <button
          title="Sélectionner le pinceau pour dessiner"
          onClick={() => setTool("brush")}
        >
          🖌️Brush
        </button>

        <button 
          title="Sélectionner la gomme pour effacer" 
          onClick={() => setTool("eraser")}
        >
          🧽Eraser
        </button>

        <button
          title="Annuler la dernière action de dessin"
          onClick={undo}
          disabled={historyIndex <= 0}
        >
          ↩️Undo
        </button>

        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
        >
          ↪️Redo
        </button>

        <button
          title="Effacer tout le dessin"
          type="button"
          onClick={clearCanvas}
          disabled={!hasDrawn}
        >
          ❌Clear all
        </button>
      </div>
      
      <div className={styles.saveControls}>
        <input
          title="Renseigner un titre"
          type="text"
          placeholder="Titre du dessin"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />

        <button
          title="Sauvegarder et publier votre dessin"
          onClick={saveImage}
          disabled={!canSave}
          className={
            `button ${canSave 
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"}`
          }
        >
          ✅Save
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="🎉 Dessin sauvegardé"
        message="Votre œuvre a bien été enregistrée."
        onClose={() => router.push("/drawings")}
      />

      </div>
    </main>
  );
}