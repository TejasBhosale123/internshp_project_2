import React, { useRef, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AQI = () => {

    const rCity = useRef();

    const [city,setCity] = useState("");
    const [msg,setMsg] = useState("");

    const hCity = (e) =>{
        setCity(e.target.value);
    }

    const find  = (e) =>{
        e.preventDefault();
        if(city.trim() === "" || !city.match(/^[a-zA-Z ]+$/)){
            toast.error("Please Enter City",{autoClose:1000});
            setMsg("");
            rCity.current.focus();
            return;
        }
        const url = `https://api.waqi.info/feed/${city}/?token=46b1977c027bdad44470e8e76a726b129ea936a7`
        axios.get(url)
        .then((res) =>{
            // console.log(res.data)
            const data = res.data.data.aqi;
            // console.log(data);
            
            if(data <=50){
                setMsg(`AQI = ${data} ==> Good`)
            }
            else if(data >50 && data <=100){
                setMsg(`AQI = ${data} ==> Moderate`)
            }
            else if(data >100 && data <=150){
                setMsg(`AQI = ${data} ==> Unhealthy for Sensitive Groups`)
            }
            else if(data >150 && data <=200){
                setMsg(`AQI = ${data} ==> Unhealthy`)
            }
            else if(data >200 && data <=300){
                setMsg(`AQI = ${data} ==> Very Unhealthy`)
            }
            else if(data >300){
                setMsg(`AQI = ${data} ==> Hazardous`)
            }
            else{
                toast.warn(`${city} Not Found`);
            }
        })
        .catch((err)=>{
            toast.error(err)
        })
    }


  return (
    <div>
        <ToastContainer/>
        <center>
            <h1> Air Quality Index</h1>
            <form onSubmit={find}>
                <input type='text' placeholder='Enter City Name'onChange={hCity} ref={rCity} value={city}/>
                <br/><br/>
                <input type='submit' value='Find AQI'/>
                <br/><br/>
            </form>
            <h2>{msg}</h2>
        </center>
    </div>
  )
}

export default AQI

// https://api.waqi.info/feed/here/?token=46b1977c027bdad44470e8e76a726b129ea936a7