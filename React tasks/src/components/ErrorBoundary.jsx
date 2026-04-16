import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page error-boundary">
          <div className="error-boundary-box">
            <p className="error-boundary-icon">⚠️</p>
            <h2>Something went wrong</h2>
            <p className="error-boundary-msg">{this.state.error?.message}</p>
            <button className="btn btn-primary" onClick={() => this.setState({ hasError: false, error: null })}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
