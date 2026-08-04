// composant Canvas pour la page Create, qui contient le canvas HTML5 et gère les événements de dessin (mousedown, mousemove, mouseup)
// Aucune logique métier, seulement des données passées en props et des callbacks pour les événements de dessin. 
// Le composant est purement visuel et ne gère pas l’état du dessin lui-même.

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;

  startDrawing: (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => void;

  draw: (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => void;

  stopDrawing: () => void;
}

export const Canvas = ({
  canvasRef,
  startDrawing,
  draw,
  stopDrawing,
}: CanvasProps) => {
  return (
    <div className="canvasContainer">
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
  );
};