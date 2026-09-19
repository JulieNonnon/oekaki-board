// à lier dans vitest.config.ts pour que les tests unitaires puissent utiliser les matchers de jest-dom

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
