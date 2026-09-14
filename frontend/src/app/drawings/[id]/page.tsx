// page detail du dessin, [id] : id du dessin dans l'url pour une route dynamique
// exemple : http://localhost:3000/drawings/1 => id = 1 

import { getDrawingById } from "@/services/drawings";
import Link from "next/dist/client/link";

interface Props { // Dans Next.js, les données dynamiques sont traitées comme des promesses, donc on utilise Promise<{ id: string }> pour typer correctement les paramètres de la route dynamique.
  params: Promise<{ id: string }>;
}

export default async function DrawingDetailPage({ params }: Props) {

  const { id } = await params;

  //console.log("ID reçu par la page détail :", id);

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
