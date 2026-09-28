import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CreatePage from "./page";

vi.mock("@/components/drawing/Canvas", () => ({
  Canvas: () => <div data-testid="canvas" />,
}));

vi.mock("@/components/drawing/Toolbar", () => ({
  Toolbar: () => <div data-testid="toolbar" />,
}));

vi.mock("@/components/drawing/SaveBar", () => ({
  SaveBar: () => <div data-testid="save-bar" />,
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
});
