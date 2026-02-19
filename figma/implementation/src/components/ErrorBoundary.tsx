import { Component, type ReactNode } from "react";
import { cn } from "../lib/utils";
interface AcceptedError {
  message: string;
  reason: unknown;
}
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  Readonly<{
    hasError: boolean;
    error: AcceptedError | null;
  }>
> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: AcceptedError) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error !== null) {
      return (
        <div className={cn("error-ui")}>
          <h3>Something went wrong</h3>
          <p>{this.state.error.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
