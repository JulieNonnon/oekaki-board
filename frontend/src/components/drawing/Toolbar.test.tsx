import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("should select the eraser when the user clicks Eraser", async () => {
    const setTool = vi.fn();
    const user = userEvent.setup();

    render(
      <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={vi.fn()}
        tool="brush"
        setTool={setTool}
        undo={vi.fn()}
        redo={vi.fn()}
        clearCanvas={vi.fn()}
        historyIndex={0}
        historyLength={1}
        hasDrawn={true}
      />
    );

    const eraserButton = screen.getByRole("button", {
      name: /eraser/i,
    });

    await user.click(eraserButton);

    expect(setTool).toHaveBeenCalledWith("eraser");
  });
  it("should select the brush when the user clicks Brush", async () => {
    const setTool = vi.fn();
    const user = userEvent.setup();

    render(
        <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={vi.fn()}
        tool="eraser"
        setTool={setTool}
        undo={vi.fn()}
        redo={vi.fn()}
        clearCanvas={vi.fn()}
        historyIndex={0}
        historyLength={1}
        hasDrawn={true}
        />
    );

    const brushButton = screen.getByRole("button", {
        name: /brush/i,
    });

    await user.click(brushButton);

    expect(setTool).toHaveBeenCalledWith("brush");
  });
  it("should change the brush size when the user moves the slider", async () => {
    const setBrushSize = vi.fn();
    const user = userEvent.setup();

    render(
        <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={setBrushSize}
        tool="brush"
        setTool={vi.fn()}
        undo={vi.fn()}
        redo={vi.fn()}
        clearCanvas={vi.fn()}
        historyIndex={0}
        historyLength={1}
        hasDrawn={true}
        />
    );

    const brushSizeSlider = screen.getByRole("slider", {
        name: /taille du pinceau/i,
    });

    fireEvent.change(brushSizeSlider, {
      target: { value: "6" },
    });

    expect(setBrushSize).toHaveBeenCalledWith(6);
  });
  it("should call undo when the user clicks Undo", async () => {
    const undo = vi.fn();
    const user = userEvent.setup();

    render(
      <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={vi.fn()}
        tool="brush"
        setTool={vi.fn()}
        undo={undo}
        redo={vi.fn()}
        clearCanvas={vi.fn()}
        historyIndex={1}
        historyLength={2}
        hasDrawn={true}
      />
    );

    const undoButton = screen.getByRole("button", {
      name: /undo/i,
    });

    await user.click(undoButton);

    expect(undo).toHaveBeenCalled();
  });
  it("should disable Undo when there is no previous history state", () => {
    render(
      <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={vi.fn()}
        tool="brush"
        setTool={vi.fn()}
        undo={vi.fn()}
        redo={vi.fn()}
        clearCanvas={vi.fn()}
        historyIndex={0}
        historyLength={2}
        hasDrawn={true}
      />
    );

    const undoButton = screen.getByRole("button", {
      name: /undo/i,
    });

    expect(undoButton).toBeDisabled();
  });
  it("should call redo when the user clicks Redo", async () => {
    const redo = vi.fn();
    const user = userEvent.setup();

    render(
      <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={vi.fn()}
        tool="brush"
        setTool={vi.fn()}
        undo={vi.fn()}
        redo={redo}
        clearCanvas={vi.fn()}
        historyIndex={0}
        historyLength={2}
        hasDrawn={true}
      />
    );

    const redoButton = screen.getByRole("button", {
      name: /redo/i,
    });

    await user.click(redoButton);

    expect(redo).toHaveBeenCalled();
  });
  it("should disable Redo when there is no next history state", () => {
    render(
      <Toolbar
        color="black"
        setColor={vi.fn()}
        brushSize={5}
        setBrushSize={vi.fn()}
        tool="brush"
        setTool={vi.fn()}
        undo={vi.fn()}
        redo={vi.fn()}
        clearCanvas={vi.fn()}
        historyIndex={1}
        historyLength={2}
        hasDrawn={true}
      />
    );

    const redoButton = screen.getByRole("button", {
      name: /redo/i,
    });

    expect(redoButton).toBeDisabled();
  });
});
