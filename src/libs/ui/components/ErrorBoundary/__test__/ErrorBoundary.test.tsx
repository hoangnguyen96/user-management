import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import ErrorBoundary from "..";

const ThrowError = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders fallback UI when an error is thrown", () => {
    const fallbackUI = <div>Something went wrong.</div>;

    render(
      <ErrorBoundary fallback={fallbackUI}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("renders children when no error is thrown", () => {
    const ChildComponent = () => <div>Child component content</div>;

    render(
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Child component content")).toBeInTheDocument();
  });
});
