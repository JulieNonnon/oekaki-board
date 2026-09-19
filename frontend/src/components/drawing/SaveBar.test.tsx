import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SaveBar } from "./SaveBar";

describe("SaveBar", () => {
  it("should disable the Save button when drawing cannot be saved", () => {
    render(
      <SaveBar
        title=""
        setTitle={() => {}}
        onSave={() => {}}
        canSave={false}
      />
    );

    // cherche le boutton "save"
    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });

    expect(saveButton).toBeDisabled();
  });
  it("should enable the Save button when drawing can be saved", () => {
    render(
        <SaveBar
        title="Mon dessin"
        setTitle={() => {}}
        onSave={() => {}}
        canSave={true}
        />
    );

    const saveButton = screen.getByRole("button", {
        name: /save/i,
    });

    expect(saveButton).toBeEnabled();
    });
});
