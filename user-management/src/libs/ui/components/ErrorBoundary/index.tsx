import React, { Component, ReactNode } from "react";
import { Typography } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("The application has crashed!", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography variant="h1">Sorry.. there was an error!</Typography>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
