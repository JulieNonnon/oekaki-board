// liste des dessins

import { getDrawings } from "@/services/drawings";
import { DrawingGrid } from "@/components/drawing/DrawingGrid";
import { Container } from "@/components/layout/Container";

export default async function DrawingsPage() {
  const { data } = await getDrawings();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        🎨 Oekaki Board
      </h1>

      <Container>
        <DrawingGrid drawings={data} />
      </Container>
    </main>
  );
}