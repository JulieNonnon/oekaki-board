import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePage from "./page";
import { createDrawing } from "@/services/drawings";
import type { MouseEventHandler } from "react";

vi.mock("@/services/drawings", () => ({
  createDrawing: vi.fn(),
}));

vi.mock("@/components/drawing/Canvas", () => ({
  Canvas: ({
    startDrawing,
    draw,
  }: {
    startDrawing: React.MouseEventHandler<HTMLCanvasElement>;
    draw: React.MouseEventHandler<HTMLCanvasElement>;
  }) => (
    <canvas
      data-testid="canvas"
      onMouseDown={startDrawing}
      onMouseMove={draw}
    />
  ),
}));

vi.mock("@/components/drawing/Toolbar", () => ({
  Toolbar: () => <div data-testid="toolbar" />,
}));

vi.mock("@/components/drawing/SaveBar", () => ({
  SaveBar: ({
    title,
    setTitle,
    onSave,
    canSave,
  }: {
    title: string;
    setTitle: (value: string) => void;
    onSave: () => void;
    canSave: boolean;
  }) => (
    <div data-testid="save-bar">
      <input
        data-testid="title-input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button
        onClick={onSave}
        disabled={!canSave}
      >
        Save
      </button>
    </div>
  ),
}));

vi.mock("@/components/ui/Modal", () => ({
  Modal: () => null,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("CreatePage", () => {
  it("should render the drawing editor", () => {
    render(<CreatePage />);

    expect(
      screen.getByRole("heading", {
        name: /create drawing/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByTestId("canvas")).toBeInTheDocument();
    expect(screen.getByTestId("toolbar")).toBeInTheDocument();
    expect(screen.getByTestId("save-bar")).toBeInTheDocument();
  });
  it("should enable Save after drawing and entering a title", () => {
    render(<CreatePage />);

    const canvas = screen.getByTestId("canvas");

    fireEvent.mouseDown(canvas);
    fireEvent.mouseMove(canvas);

    const titleInput = screen.getByTestId("title-input");

    fireEvent.change(titleInput, {
      target: { value: "Mon dessin" },
    });

    const saveButton = screen.getByRole("button", {
      name: "Save",
    });

    expect(saveButton).toBeEnabled();
  });
});
