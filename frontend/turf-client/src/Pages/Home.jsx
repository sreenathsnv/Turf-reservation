import React from "react";
import "../CSS/Home/home.css";

const Home = () => {
  return (
    <main>
      <div className="container-main">
        <section id="hero">
          <h2>Book Your Turf Easily and Quickly</h2>
          <p>Find the best turfs near you and book online.</p>
          <button
            onclick="window.location.href='booking.html'"
            class="cta-button"
          >
            Book Now
          </button>
        </section>

        <section id="turfs">
          <h2>Available Turfs</h2>
          <div class="turf-list"></div>
          <div class="search">
            <input placeholder="Search..." type="text" />
            <button type="submit">Go</button>
          </div>
        </section>

        <div class="button-box">
          <button
            class="create-button"
            onclick="window.location.href='create.html'"
          >
            Create
          </button>
          <button
            class="create-button"
            onclick="window.location.href='join.html'"
          >
            Join
          </button>
        </div>

        <section id="recommendations">
          <h2>Nearby Recommendations</h2>
          <div class="recommendation-list">
            <div class="recommendation-box" data-turf="Campnou">
              <h3>Campnou</h3>
              <p>Location: Marathahalli</p>
              <p>Rating: 4.5/5</p>
              <button onclick="window.location.href='booking.html'">
                Book Now
              </button>
            </div>
            <div class="recommendation-box" data-turf="Santiyago">
              <h3>Santi yago</h3>
              <p>Location: Kadkodi</p>
              <p>Rating: 4.2/5</p>
              <button onclick="window.location.href='booking.html'">
                Book Now
              </button>
            </div>
            <div class="recommendation-box" data-turf="Astro Arena">
              <h3>Astro Arena</h3>
              <p>Location: Whitefield</p>
              <p>Rating: 4.8/5</p>
              <button onclick="window.location.href='booking.html'">
                Book Now
              </button>
            </div>
          </div>
          <button class="load-more-btn" onclick="loadMoreRecommendations()">
            Load More
          </button>
        </section>
      </div>
    </main>
  );
};

export default Home;
