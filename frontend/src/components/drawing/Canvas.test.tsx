import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Canvas } from "./Canvas";

describe("Canvas", () => {
  it("should display Canvas component", () => {
    const canvasRef = createRef<HTMLCanvasElement>();

    const { container } = render(
      <Canvas
        canvasRef={canvasRef}
        width={600}
        height={400}
        startDrawing={vi.fn()}
        draw={vi.fn()}
        stopDrawing={vi.fn()}
      />
    );

    const canvasElement = container.querySelector("canvas");

    expect(canvasElement).toBeInTheDocument();
  });
});
