import React, { useEffect } from "react";

function Artists({ artists, setArtists }) {
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "artists/")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch(console.error);
  }, []);
  return (
    <div>
      {artists.slice().reverse().map((artist) => {
        return <h3>{artist.name}</h3>;
      })}
    </div>
  );
}

export default Artists;
