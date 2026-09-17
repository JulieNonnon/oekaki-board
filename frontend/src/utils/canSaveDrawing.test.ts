import { describe, expect, it } from "vitest";
import { canSaveDrawing } from "./canSaveDrawing";

describe("canSaveDrawing", () => {
  it("should return false when the title is empty", () => {
    expect(canSaveDrawing("", true)).toBe(false);
  });

  it("should return false when no drawing exists", () => {
    expect(canSaveDrawing("Mon dessin", false)).toBe(false);
  });

  it("should return true when title and drawing exist", () => {
    expect(canSaveDrawing("Mon dessin", true)).toBe(true);
  });
  it("should return false if both title and drawing don't exist", () => {
    expect(canSaveDrawing("", false)).toBe(false);
  });
  // edge case:
  it("should return false when the title only contains spaces", () => {
    expect(canSaveDrawing("  ", true)).toBe(false);
  });
});
