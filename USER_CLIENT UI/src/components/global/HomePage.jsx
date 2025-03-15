import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modules/HomePage.css";

const features = [
  { title: "Explore Exotic Destinations", text: "Discover the world’s hidden gems, from bustling cities to serene escapes." },
  { title: "Savor Local Flavors", text: "Find the finest restaurants, cozy cafes, and hotels for an unforgettable culinary adventure." },
  { title: "Personalized AI Itinerary", text: "Let AI curate your dream itinerary, perfectly tailored to your preferences and needs." },
  { title: "Uncover Local Secrets", text: "Dive into authentic local experiences and uncover spots only the locals know." },
  { title: "Grow Your Travel Business", text: "Promote your services to a global audience with location-based recommendations." }
];

const HomePage = () => {
  const navigate = useNavigate();

  // Handle CTA navigation (memoized for performance)
  const handleCTA = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header-section">
        <h1 className="title">AI TOUR GUIDER</h1>
        <p className="caption">Your Ultimate Travel Companion Awaits</p>
        <p className="intro-text">
          Ready for your next adventure? Let AI plan the perfect trip for you. Whether it's exploring new destinations or finding the best places to eat and stay, we’ve got you covered!
        </p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Features Section */}
        <section className="features-section">
          {features.map((feature, index) => (
            <article key={index} className="feature-box">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </section>

        {/* Call-to-Action Section */}
        <section id="cta-section" className="cta-section" aria-live="polite">
          <p>Start Your Journey Now – It’s Time to Explore!</p>
          <button
            className="cta-button"
            onClick={handleCTA}
            aria-label="Get Started with Registration"
          >
            Let's Go!
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
