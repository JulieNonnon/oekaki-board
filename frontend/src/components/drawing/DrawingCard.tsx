import Link from "next/link";
import { Drawing } from "@/types/drawing";

interface Props {
  drawing: Drawing;
}

export const DrawingCard = ({ drawing }: Props) => {
  return (
    <Link href={`/drawings/${drawing.id}`}>
      {/* <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"> */}
        
      <div className="card">
        <img src={drawing.imageUrl} />
        <div style={{ padding: "10px" }}>
            <h2>{drawing.title}</h2>
        </div>

          <p>
            {new Date(drawing.createdAt).toLocaleDateString()}
          </p>
        </div>
    </Link>
  );
};
