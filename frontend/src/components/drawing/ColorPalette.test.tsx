import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ColorPalette } from "./ColorPalette";

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
});
