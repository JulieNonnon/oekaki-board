// page detail du dessin, [id] : id du dessin dans l'url pour une route dynamique
// exemple : http://localhost:3000/drawings/1 => id = 1 

import { getDrawingById } from "@/services/drawings";

interface Props {
  params: {
    id: string;
  };
}

export default async function DrawingDetailPage({ params }: Props) {
  const drawing = await getDrawingById(params.id);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <img
        src={drawing.imageUrl}
        alt={drawing.title}
        className="w-full rounded-xl mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">
        {drawing.title}
      </h1>

      <p className="text-gray-600 mb-4">
        par {drawing.author.username}
      </p>

      <div className="flex gap-4 text-gray-700">
        <span>❤️ {drawing.likesCount}</span>
        <span>💬 {drawing.commentsCount}</span>
      </div>
    </main>
  );
}