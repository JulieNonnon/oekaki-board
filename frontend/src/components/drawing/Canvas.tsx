// composant Canvas pour la page Create, qui contient le canvas HTML5 et gère les événements de dessin (mousedown, mousemove, mouseup)
// Aucune logique métier, seulement des données passées en props et des callbacks pour les événements de dessin. 
// Le composant est purement visuel et ne gère pas l’état du dessin lui-même.

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startDrawing: React.MouseEventHandler<HTMLCanvasElement>;
  draw: React.MouseEventHandler<HTMLCanvasElement>;
  stopDrawing: () => void;
  // width: number; [PROCHAINE VERSION] : ajouter le props width pour donner la possibilité à l'utilisateur de configurer la taille du canvas, actuellement en dur dans le code pour simplifier de développement.
  // height: number; [PROCHAINE VERSION] : ajouter le props height pour donner la possibilité à l'utilisateur de configurer la taille du canvas, actuellement en dur dans le code pour simplifier de développement.
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
        width={600} // temporairement fixé à 600px, à remplacer par le props width dans une prochaine version
        height={400} // temporairement fixé à 400px, à remplacer par le props height dans une prochaine version
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};