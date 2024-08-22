import React, { useEffect,useState } from "react";
import Turf from "./Turf";

const TurfRecommendations = ({ turfs }) => {
  const [turfnum, setTurfNum] = useState(5);
  useEffect(() => {}, [turfnum]);

  const loadTurfs = () => {
    setTurfNum(turfnum + 5);
  };

  return (
    <>
      <div className="recommendation-list">
        {turfs.map((turf, index) => {
          return index <= turfnum && <Turf props= {turf} key={index} />;
        })}
      </div>
      <button className="load-more-btn" onClick={loadTurfs}>Load More</button>
    </>
  );
};

export default TurfRecommendations;
