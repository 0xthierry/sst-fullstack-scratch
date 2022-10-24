import { it, expect } from "vitest";
import { costCalculator } from "../functions/billing";

it("lowest tier", () => {
  const storage = 10;
  const cost = 4000;

  const expectedCost = costCalculator(storage);

  expect(cost).toBe(expectedCost);
});

it("middle tier", () => {
  const storage = 100;
  const cost = 20000;

  const expectedCost = costCalculator(storage);

  expect(cost).toBe(expectedCost);
});


it("highest tier", () => {
  const storage = 101;
  const cost = 10100;

  const expectedCost = costCalculator(storage);

  expect(cost).toBe(expectedCost);
});
