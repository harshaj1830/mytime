import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { render, screen, act } from "@testing-library/react";
import React from "react";

import { routeTree } from "@/routeTree.gen";
import { setBirthDetails } from "@/lib/birth-details";
import { Route as TimeCapsuleRoute } from "@/routes/time-capsule";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("renders time capsule page with birth details without crashing", async () => {
    setBirthDetails({
      name: "Ananya Rao",
      date: "1995-05-12",
      country: "India",
      city: "Hyderabad",
      time: "10:30",
      accuracy: "exact",
    });

    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    await router.load();
    await router.navigate({ to: "/time-capsule" });

    const { RouterProvider } = await import("@tanstack/react-router");
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Your time capsule/i)).toBeInTheDocument();
  });

  it("completes the form submission flow", async () => {
    const { fireEvent } = await import("@testing-library/react");

    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    await router.load();
    await router.navigate({ to: "/" });

    const { RouterProvider } = await import("@tanstack/react-router");
    render(<RouterProvider router={router} />);

    const nameInput = screen.getByLabelText(/Full name/i);
    const dateInput = screen.getByLabelText(/Date of birth/i);
    const countrySelect = screen.getByLabelText(/Country/i);
    const cityInput = screen.getByLabelText(/City/i);
    const submitBtn = screen.getByRole("button", { name: /Discover My Day/i });

    fireEvent.change(nameInput, { target: { value: "Aarav Sharma" } });
    fireEvent.change(dateInput, { target: { value: "1998-04-20" } });
    fireEvent.change(countrySelect, { target: { value: "India" } });
    fireEvent.change(cityInput, { target: { value: "Mumbai" } });

    fireEvent.click(submitBtn);

    expect(screen.getByText(/Assembling your time capsule/i)).toBeInTheDocument();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });

    expect(screen.getByText(/Aarav Sharma · Mumbai, India/i)).toBeInTheDocument();
  });

  it("renders complete 11-feature time capsule for 30 August 2005 Visakhapatnam", async () => {
    setBirthDetails({
      name: "Harsha",
      date: "2005-08-30",
      country: "India",
      city: "Visakhapatnam",
      time: "12:33",
      accuracy: "exact",
    });

    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    await router.load();
    await router.navigate({ to: "/time-capsule" });

    const { RouterProvider } = await import("@tanstack/react-router");
    render(<RouterProvider router={router} />);

    // Verification of all core features
    expect(screen.getByText(/Harsha · Visakhapatnam, India · 12:33/i)).toBeInTheDocument();
    expect(screen.getByText(/Life in Numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/The Sky on Your Day/i)).toBeInTheDocument();
    expect(screen.getByText(/The World on Your Birthday/i)).toBeInTheDocument();
    expect(screen.getByText(/Headlines of the Day/i)).toBeInTheDocument();
    expect(screen.getByText(/The Newspaper That Welcomed You/i)).toBeInTheDocument();
    expect(screen.getByText(/The Weather That Greeted You/i)).toBeInTheDocument();
    expect(screen.getByText(/Everyday Life & Prices/i)).toBeInTheDocument();
    expect(screen.getByText(/Birthday Companions/i)).toBeInTheDocument();
    expect(screen.getByText(/Cinema & Pop Culture/i)).toBeInTheDocument();
    expect(screen.getByText(/Certificate of Arrival/i)).toBeInTheDocument();
  });
});
