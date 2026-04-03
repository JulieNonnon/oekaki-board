import { Drawing } from "../../types/drawing";
import Link from "next/link";

interface Props {
  drawing: Drawing;
}

export const DrawingCard = ({ drawing }: Props) => {
  return (
    <Link href={`/drawings/${drawing.id}`}>
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
        <img
            src={drawing.imageUrl}
            alt={drawing.title}
            className="w-full h-48 object-cover"
        />

        <div className="p-3">
            <h2 className="font-semibold">{drawing.title}</h2>

            <p className="text-sm text-gray-500">
            par {drawing.author.username}
            </p>

            <div className="flex justify-between text-sm mt-2 text-gray-600">
            <span>❤️ {drawing.likesCount}</span>
            <span>💬 {drawing.commentsCount}</span>
            </div>
        </div>
      </div>
    </Link>
  );
};