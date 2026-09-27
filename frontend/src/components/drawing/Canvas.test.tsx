import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
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
  it("should call startDrawing when the user presses the canvas", () => {
    const startDrawing = vi.fn();

    render(
      <Canvas
        canvasRef={createRef<HTMLCanvasElement>()}
        width={600}
        height={400}
        startDrawing={startDrawing}
        draw={vi.fn()}
        stopDrawing={vi.fn()}
      />
    );

    const canvasElement = document.querySelector("canvas");

    fireEvent.mouseDown(canvasElement!);

    expect(startDrawing).toHaveBeenCalled();
  });
  it("should call draw when the user moves the mouse over the canvas", () => {
    const draw = vi.fn();

    render(
      <Canvas
        canvasRef={createRef<HTMLCanvasElement>()}
        width={600}
        height={400}
        startDrawing={vi.fn()}
        draw={draw}
        stopDrawing={vi.fn()}
      />
    );

    const canvasElement = document.querySelector("canvas");

    fireEvent.mouseMove(canvasElement!);
    expect(draw).toHaveBeenCalled();
  })
  it("should call stopDrawing when the user releases the mouse button", () => {
    const stopDrawing = vi.fn();

    render(
      <Canvas
        canvasRef={createRef<HTMLCanvasElement>()}
        width={600}
        height={400}
        startDrawing={vi.fn()}
        draw={vi.fn()}
        stopDrawing={stopDrawing}
      />
    );

    const canvasElement = document.querySelector("canvas");

    fireEvent.mouseUp(canvasElement!);

    expect(stopDrawing).toHaveBeenCalled();
  });
});
