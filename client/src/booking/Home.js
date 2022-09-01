import { useState, useEffect } from "react";

import axios from "axios";
import RoomDisplay from "../components/cards/RoomDisplay";
import SearchForm from "../components/forms/SearchForm";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllHotels();
  }, []);

  const loadAllHotels = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/hotels`);

    setHotels(res.data);
  };
  return (
    <>
      <div className="containe-fluid p-5 bg-secondary text-center navimage">
        <h1>home</h1>
      </div>

      <div className="col">
        <br />
        <SearchForm />
      </div>

      <div>
        {hotels.map((h) => (
          <RoomDisplay key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;
