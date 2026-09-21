import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
