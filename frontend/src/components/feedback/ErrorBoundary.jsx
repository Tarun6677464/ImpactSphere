import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-sm">Please refresh the page. If this persists, contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
