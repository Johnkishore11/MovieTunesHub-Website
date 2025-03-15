import React from "react";
import { Link } from "react-router-dom";
import "../../styles/modules/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <main className="not-found-container" role="main" aria-live="assertive">
      <section className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-button" aria-label="Go back to homepage">
          Go Back Home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
