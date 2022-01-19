import React, { useState } from "react";
const artistInit = {
  photo_url: "",
  nationality: "",
  name: "",
};
function CreateArtistForm({ setErrors, setArtists, token }) {
  const options = {
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    method: "POST",
  };
  const [artistForm, setArtistForm] = useState(artistInit);

  const handleChange = (ev) =>
    setArtistForm({ ...artistForm, [ev.target.name]: ev.target.value });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    fetch(process.env.REACT_APP_API_URL + "artists/", {
      ...options,
      body: JSON.stringify(artistForm),
    })
      .then((res) => {
        const json = res.json();
        if (res.ok) {
          setErrors({});
          return json;
        } else {
          return json.then((err) => {
            const errors = { errors: err, status: res.status };
            setErrors(errors);
            return errors;
          });
        }
      })
      .then((json) => {
        if (!("errors" in json)) setArtists(artists=>[...artists, json])

      });
  };
  return (
    <div>
      <h2>Create an Artist</h2>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input onChange={handleChange} type="text" name="name" id="name" />
        </label>
        <label>
          nationality
          <input
            onChange={handleChange}
            type="text"
            name="nationality"
            id="nationality"
          />
        </label>
        <label>
          photo url
          <input
            onChange={handleChange}
            type="text"
            name="photo_url"
            id="photo_url"
          />
        </label>
        <button>submit</button>
      </form>
    </div>
  );
}

export default CreateArtistForm;
