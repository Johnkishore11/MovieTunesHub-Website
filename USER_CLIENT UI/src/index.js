import React, { useEffect, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store/Store";
import { loadUser } from "./redux/actions/authActions";
import "./styles/index.css";

const App = lazy(() => import("./App"));

// ErrorBoundary to catch unexpected errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Oops! Something went wrong.</h1>
          <p>Our team has been notified. Please try refreshing the page or come back later.</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={this.handleReload}>🔄 Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// **AppLoader Ensures Redux State is Ready Before Rendering**
const AppLoader = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const clientState = useSelector((state) => state.client);

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.loading) {
      dispatch(loadUser());
    }
  }, [dispatch, authState.isAuthenticated, authState.loading]);

  // Prevent rendering if Redux store isn't ready
  if (authState.loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <App role={authState.user?.role} isAuthenticated={authState.isAuthenticated} clientState={clientState} />
    </Suspense>
  );
};

// **Root Component with PersistGate Handling**
const RootComponent = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} onBeforeLift={() => console.log("Redux Persist Loaded!")}>
      <ErrorBoundary>
        <AppLoader />
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
