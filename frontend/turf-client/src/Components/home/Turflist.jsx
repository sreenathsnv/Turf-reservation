import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/CustomFetch";
import TurfRecommendations from "./TurfRecommendations";
import "../../CSS/Home/refreshbtn.css";
import { toast } from "react-toastify";
const Turflist = () => {
  const [turfs, setTurfs] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  const refreshComponent = () => {
    setSearch("");
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function fetchTurf() {
      try {
        const response = await axiosInstance.get("/get-all-turfs/");
        console.log(response.data);
        
        setTurfs(response.data);
      } catch (error) {
        toast.error(response.data || "Couldn't  fetch turfs", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }

    fetchTurf();
  }, [refresh]);

  const handleSearch = () => {
    if (search === "") {
      console.log("trig");

      setRefresh(!refresh);
    } else {
      let searchedItems = turfs?.filter(
        (turf) =>
          turf.turf_name
            .toLowerCase()
            .includes(search.toString().toLowerCase().trim()) ||
          turf.city
            .toLowerCase()
            .includes(search.toString().toLowerCase().trim())
      );
      setTurfs(searchedItems);
    }
  };

  return (
    <>
      <section id="turfs">

      <div className="button-box">
        <button className="create-button">Create</button>
        <button className="create-button">Join</button>
      </div>

        <h2>Available Turfs</h2>
        <div className="turf-list"></div>
        
        <div className="search">
          <button className="refresh-btn" onClick={refreshComponent}>
            <span className="icon"></span>
          </button>
          <input
            placeholder="Search city or turf name"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch();
            }}
          />
        </div>
      </section>

      <section id="recommendations">
        
        {
        turfs.length >0 ? (
            <>
            <h6 className="turf-recomendation-header">Nearby Recommendations</h6>
            <TurfRecommendations turfs={turfs} />
            </> 
            
        )
    :<h2>No turfs available</h2>
    }
      </section>
    </>
  );
};

export default Turflist;
