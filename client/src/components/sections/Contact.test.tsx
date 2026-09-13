import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./Contact";

describe("ContactPage map location", () => {
  it("uses the verified trust office pin for the embed and external map link", () => {
    render(<ContactPage />);

    expect(screen.getByTitle(/google maps location/i)).toHaveAttribute(
      "src",
      "https://www.google.com/maps?q=13.0420117,80.2185979&z=18&output=embed",
    );
    expect(screen.getByRole("link", { name: /open in maps/i })).toHaveAttribute(
      "href",
      expect.stringContaining("!3d13.0420117!4d80.2185979"),
    );
  });
});
