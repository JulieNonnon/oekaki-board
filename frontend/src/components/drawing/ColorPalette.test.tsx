import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ColorPalette } from "./ColorPalette";
import { userEvent } from "@testing-library/user-event/dist/cjs/setup/index.js";

describe("ColorPalette", () => {
  it("should render 10 color buttons", () => {
    render(
      <ColorPalette
        selectedColor="#000000"
        onChange={() => {}}
      />
    );

    const colorButtons = screen.getAllByRole("button");

    expect(colorButtons).toHaveLength(10);
  });
  it("should call onChange with the selected color", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
        <ColorPalette
            selectedColor="#000000"
            onChange={onChange}
        />
    );

    const redButton = screen.getByTitle(
        "Sélectionner la couleur #FF0000"
    );

    await user.click(redButton);

    expect(onChange).toHaveBeenCalledWith("#FF0000");
    });
    it("should highlight the selected color with a black border", () => {
        const onChange = vi.fn();

        render(
            <ColorPalette
            selectedColor="#FF0000"
            onChange={onChange}
            />
        );

        const redButton = screen.getByTitle(
            "Sélectionner la couleur #FF0000"
        );

        expect(redButton.style.border).toBe("3px solid black");
    });
    it("should display the provided title for each color button", () => {
        const onChange = vi.fn();

        render(
            <ColorPalette
            title="Choisir une couleur"
            selectedColor="#000000"
            onChange={onChange}
            />
        );

        const colorButtons = screen.getAllByRole("button");

        colorButtons.forEach((button) => {
            expect(button.title).toBe("Choisir une couleur");
        });
    });
});
