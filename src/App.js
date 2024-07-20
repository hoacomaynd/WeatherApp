import React, {useState, useEffect} from 'react'

const api = {
    key:"42f3827692b8d61b5f914e9d5ac70ce8",
    base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
    const [searchInput, setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    useEffect(()=>{
        const fetchWeatherData = async () =>{
            if(!searchCity) return;
            setLoading(true);
            try{
                const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
                const response = await fetch(url);
                const data = await response.json();
                if(response.ok){
                    setWeatherInfo(`${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`);
                    setErrorMessage("");
                }else{
                    setErrorMessage(data.message);
                }
            }catch(e){
                setErrorMessage(e.message)
            }
            setLoading(false);
        }
        fetchWeatherData();
    },[searchCity])
    const handleSubmit = (e) =>{
        e.preventDefault();
        setSearchCity(searchInput);
    }
    return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='City' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button>Search</button>
        </form>
        {loading ?(<div>Loading...</div>):(<>{errorMessage ? (<div style={{color:"red"}}>{errorMessage}</div>) :(<div>{weatherInfo}</div>)}</>)}
        
        
        
    </>
  )
}

export default App