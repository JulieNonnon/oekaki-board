// Composant toolbar pour page Create, qui contient les boutons pour les actions de dessin (undo, redo, clear all)
// Aucune logique métier, seulement des données passées en props et des callbacks pour les actions de dessin. 
// Le composant est purement visuel et ne gère pas l’état du dessin lui-même.

import { ColorPalette } from "./ColorPalette";

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;

  brushSize: number;
  setBrushSize: (size: number) => void;

  tool: "brush" | "eraser";
  setTool: (tool: "brush" | "eraser") => void;

  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;

  historyIndex: number;
  historyLength: number;

  hasDrawn: boolean;
}

export const Toolbar = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  tool,
  setTool,
  undo,
  redo,
  clearCanvas,
  historyIndex,
  historyLength,
  hasDrawn
}: ToolbarProps) => {

    return (
        <div className="canvasControls">

            <section>
                <label>Palette de couleurs :</label>

                <input
                title="Afficher la palette de couleurs"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="input"
                />

                <ColorPalette
                selectedColor={color}
                onChange={setColor}
                />
            </section>

            <section>
                <label>
                    Taille du pinceau : {brushSize}px
                </label>

                <input
                    title="Changer la taille du pinceau"
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) =>
                    setBrushSize(Number(e.target.value))
                    }
                />
            </section>

            <section>
                <button
                    title="Sélectionner l'outil pinceau"
                    onClick={() => setTool("brush")}
                    className={tool === "brush" ? "button-active" : ""}
                >
                    🖌️ Brush
                </button>

                <button
                title="Sélectionner l'outil gomme"
                onClick={() => setTool("eraser")}
                className={tool === "eraser" ? "button-active" : ""}
                >
                🧽 Eraser
                </button>
            </section>

            <section>            
                <button
                title="Annuler la dernière action"
                onClick={undo}
                disabled={historyIndex <= 0}
                >
                ↩️ Undo
                </button>

                <button
                title="Refaire la dernière action"
                onClick={redo}
                disabled={historyIndex >= historyLength - 1}
                >
                ↪️ Redo
                </button>

                <button
                title="Effacer tout"
                onClick={clearCanvas}
                disabled={!hasDrawn}
                >
                ❌ Clear all
                </button>
            </section>

        </div>
    )
};
