import { Drawing } from "../../types/drawing";
import { DrawingCard } from "./DrawingCard";

interface Props {
  drawings: Drawing[];
}

export const DrawingGrid = ({ drawings }: Props) => {
  if (!drawings || drawings.length === 0) {
    return <p className="text-gray-500">Aucun dessin pour le moment 🎨</p>;
  }

  return (
    <div>
      {drawings.map((drawing) => (
        <DrawingCard key={drawing.id} drawing={drawing} />
      ))}
    </div>
  );
};