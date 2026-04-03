import { Drawing } from "../../types/drawing";
import { DrawingCard } from "./DrawingCard";

interface Props {
  drawings: Drawing[];
}

export const DrawingGrid = ({ drawings }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {drawings.map((drawing) => (
        <DrawingCard key={drawing.id} drawing={drawing} />
      ))}
    </div>
  );
};