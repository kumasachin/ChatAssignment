import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chat from "./Chat";

describe("Chat Component", () => {
  it("renders Header and Tabs components", () => {
    render(<Chat />);
    // expect(screen.getByRole("banner")).toBeInTheDocument(); // Assuming Header has a role="banner"
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  //   it("renders ChatTab by default", () => {
  //     render(<Chat />);
  //     expect(screen.getByText("ChatTab Content")).toBeInTheDocument(); // Replace with actual content from ChatTab
  //   });

  //   it("renders ProfileTab when Profile tab is clicked", async () => {
  //     render(<Chat />);
  //     const profileTab = screen.getByText("Profile");
  //     await userEvent.click(profileTab);
  //     expect(screen.getByText("ProfileTab Content")).toBeInTheDocument(); // Replace with actual content from ProfileTab
  //   });

  //   it("switches back to ChatTab when Chat tab is clicked", async () => {
  //     render(<Chat />);
  //     const profileTab = screen.getByText("Profile");
  //     await userEvent.click(profileTab);
  //     expect(screen.getByText("ProfileTab Content")).toBeInTheDocument(); // Replace with actual content from ProfileTab

  //     const chatTab = screen.getByText("Chat");
  //     await userEvent.click(chatTab);
  //     expect(screen.getByText("ChatTab Content")).toBeInTheDocument(); // Replace with actual content from ChatTab
  //   });
});
