// liste des dessins

// on force le rendu côté serveur pour éviter les problèmes de cache Next.js lors du développement
export const dynamic = "force-dynamic";

import { getDrawings } from "@/services/drawings";
import { DrawingGrid } from "@/components/drawing/DrawingGrid";
import { Container } from "@/components/layout/Container";

export default async function DrawingsPage() {
  const drawings = await getDrawings();

  return (
    <main className="container">
  <h1>🎨 Oekaki Board</h1>

  <div className="grid">
    <DrawingGrid drawings={drawings} />
  </div>
</main>
  );
}