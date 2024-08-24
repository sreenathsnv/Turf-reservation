import React, { useState } from "react";
import "../CSS/Home/home.css";

const Home = () => {
  const [recommendations, setRecommendations] = useState([
    { name: "Campnou", location: "Marathahalli", rating: "4.5/5" },
    { name: "Santiyago", location: "Kadkodi", rating: "4.2/5" },
    { name: "Astro Arena", location: "Whitefield", rating: "4.8/5" }
  ]);

  const loadMoreRecommendations = () => {
    const moreRecommendations = [
      { name: "Turf D", location: "PQR Area", rating: "4.6/5" },
      { name: "Turf E", location: "STU Area", rating: "4.3/5" },
      { name: "Turf F", location: "VWX Area", rating: "4.7/5" }
    ];
    setRecommendations([...recommendations, ...moreRecommendations]);
  };

  const handleSearchInput = (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredRecommendations = recommendations.filter((rec) =>
      rec.name.toLowerCase().includes(filter)
    );
    setRecommendations(filteredRecommendations);
  };

  return (
    <main>
      <div className="container-main">
        <section id="hero">
          <h2>Book Your Turf Easily and Quickly</h2>
          <p>Find the best turfs near you and book online.</p>
          <button
            onClick={() => (window.location.href = 'booking.html')}
            className="cta-button"
          >
            Book Now
          </button>
        </section>

        <section id="turfs">
          <h2>Available Turfs</h2>
          <div className="turf-list"></div>
          <div className="search">
            <input 
              placeholder="Search..." 
              type="text" 
              onChange={handleSearchInput}
            />
            <button type="submit">Go</button>
          </div>
        </section>

        <div className="button-box">
          <button
            className="create-button"
            onClick={() => (window.location.href = 'create.html')}
          >
            Create
          </button>
          <button
            className="create-button"
            onClick={() => (window.location.href = 'join.html')}
          >
            Join
          </button>
        </div>

        <section id="recommendations">
          <h2>Nearby Recommendations</h2>
          <div className="recommendation-list">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-box" data-turf={rec.name}>
                <h3>{rec.name}</h3>
                <p>Location: {rec.location}</p>
                <p>Rating: {rec.rating}</p>
                <button onClick={() => (window.location.href = 'booking.html')}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
          <button className="load-more-btn" onClick={loadMoreRecommendations}>
            Load More
          </button>
        </section>
      </div>
    </main>
  );
};

export default Home;
