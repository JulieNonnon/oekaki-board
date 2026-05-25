// page detail du dessin, [id] : id du dessin dans l'url pour une route dynamique
// exemple : http://localhost:3000/drawings/1 => id = 1 

import { getDrawingById } from "@/services/drawings";

interface Props {
  params: { id: string | string[] };
}

export default async function DrawingDetailPage({ params }: Props) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const drawing = await getDrawingById(id);

  if (!drawing) {
    return <p>Dessin introuvable 😢</p>;
  }

  return (
    <main className="container">
      <div className="card">

        <img
          src={drawing.imageUrl}
          alt={drawing.title}
          className="w-full rounded-xl mb-4"
        />

        <div style={{ padding: 16 }}>
        <h1>{drawing.title}</h1>
        <p className="text-gray-600 mb-4">par {drawing.author.username}</p>
        </div>

        <div className="flex gap-4 text-gray-700">
          <span>❤️ {drawing._count.likes}</span>
          <span>💬 {drawing._count.comments}</span>
        </div>

      </div>
    </main>
  );
}
