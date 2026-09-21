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
        tool="brush"
        setTool={setTool}
      />
    );

    const eraserButton = screen.getByRole("button", {
      name: /eraser/i,
    });

    await user.click(eraserButton);

    expect(setTool).toHaveBeenCalledWith("eraser");
  });
});
