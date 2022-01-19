import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import AuthenticationForm from './AuthenticationForm';
import SignUpForm from './SignUpForm';
import Artists from './Artists';
import CreateArtistForm from './CreateArtistForm';
function App() {
  const [errors,setErrors] = useState({})
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState(null)

/*   useEffect(()=>{
    console.log(process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + 'artists/')
    .then((res=>res.json()))
    .then((json)=>console.log(json))
  },[]) */
  return (
    <div className="App">
      <header className="App-header">   
      {!!errors ? Object.values(errors).map(error=><p>{error}</p>):null}     
      <AuthenticationForm setToken={setToken} setErrors={setErrors}/>
      <SignUpForm setErrors={setErrors} />
      <CreateArtistForm setErrors={setErrors} setArtists={setArtists} token={token}/>
      <hr/>
      <Artists artists={artists} setArtists={setArtists} />
      </header>
    </div>
  );
}

export default App;
