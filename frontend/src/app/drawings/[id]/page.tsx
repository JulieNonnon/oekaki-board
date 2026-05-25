// page detail du dessin, [id] : id du dessin dans l'url pour une route dynamique
// exemple : http://localhost:3000/drawings/1 => id = 1 

import { getDrawingById } from "@/services/drawings";
import Link from "next/dist/client/link";

interface Props {
  params: { id: string | string[] };
}

export default async function DrawingDetailPage({
  params,
}: Props) {

  // const { id } = await params;
  
  // obligatoire de gérer le cas où params.id est un tableau (ce qui peut arriver avec les routes dynamiques dans Next.js) pour éviter les erreurs.
  const id = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

  const drawing = await getDrawingById(id);

  if (!drawing) {
    return <p>Dessin introuvable 😢</p>;
  }

  return (
    <main className="container">

      <Link href="/drawings">
        <button className="button">
          ↩️ Retour à l'accueil
        </button>
      </Link>

      <div className="card">

        <img
          src={drawing.imageUrl}
          alt={drawing.title}
          className="w-full rounded-xl"
        />

        <div style={{ padding: 16 }}>
          <h1>{drawing.title}</h1>
        </div>

      </div>
    </main>
  );
}
