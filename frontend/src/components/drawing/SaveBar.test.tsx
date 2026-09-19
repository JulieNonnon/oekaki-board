import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SaveBar } from "./SaveBar";
import userEvent from "@testing-library/user-event";

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
  it("should call onSave when the user clicks Save", async () => {
    const onSave = vi.fn(); // mock
    const user = userEvent.setup(); // création d'un user virtuel pour simuler les interactions utilisateur

    render(
        <SaveBar
        title="Mon dessin"
        setTitle={() => {}}
        onSave={onSave}
        canSave={true}
        />
    );

    const saveButton = screen.getByRole("button", {
        name: /save/i,
    });

    await user.click(saveButton); // Le await est important : userEvent simule les interactions utilisateur de manière asynchrone afin de se rapprocher du comportement réel du navigateur.

    expect(onSave).toHaveBeenCalled();
    });
});
