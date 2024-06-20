import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Typography } from "@mui/material";

// Components
import ErrorBoundary from "..";

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <Typography>Child component</Typography>
      </ErrorBoundary>
    );
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("renders fallback UI when an error is thrown", () => {
    const ProblemChild = () => {
      throw new Error("Error thrown from problem child");
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText("Sorry.. there was an error!")).toBeInTheDocument();
  });

  it("logs error messages to the console", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const ProblemChild = () => {
      throw new Error("Error thrown from problem child");
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
