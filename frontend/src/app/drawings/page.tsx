// liste des dessins

// on force le rendu côté serveur pour éviter les problèmes de cache Next.js lors du développement
export const dynamic = "force-dynamic";

import { getDrawings } from "@/services/drawings";
import { DrawingGrid } from "@/components/drawing/DrawingGrid";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export default async function DrawingsPage() {
  const drawings = await getDrawings();

  return (
    <main className="container">
  <h1>🎨 Oekaki Board</h1>

  <Link href="/create">
    <button className="button">
      ✨ Dessiner une œuvre
    </button>
  </Link>

  <div className="grid">
    <DrawingGrid drawings={drawings} />
  </div>
</main>
  );
}