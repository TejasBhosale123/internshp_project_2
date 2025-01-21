import React, { useRef, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AQI = () => {

    const rCity = useRef();

    const [city,setCity] = useState("");
    const [msg,setMsg] = useState("");
    const [info,setInfo] = useState("")

    const hCity = (e) =>{
        setCity(e.target.value);
    }

    const find  = (e) =>{
        e.preventDefault();
        if(city.trim() === "" || !city.match(/^[a-zA-Z ]+$/)){
            toast.error("Please Enter City)",{autoClose:1000});
            setMsg("");
            rCity.current.focus();
            return;
        }
        const url = `https://api.waqi.info/feed/${city}/?token=46b1977c027bdad44470e8e76a726b129ea936a7`
        axios.get(url)
        .then((res) =>{
            console.log(res.data.data.aqi)
            setInfo(res.data.data.aqi)
            const air_quality = res.data.data.aqi;
            
            if(air_quality <=50){
                setMsg(`AQI = ${air_quality} ==> Good`)
            }
            else if(air_quality >50 && air_quality <=100){
                setMsg(`AQI = ${air_quality} ==> Moderate`)
            }
            else if(air_quality >100 && air_quality <=150){
                setMsg(`AQI = ${air_quality} ==> Unhealthy for Sensitive Groups`)
            }
            else if(air_quality >150 && air_quality <=200){
                setMsg(`AQI = ${air_quality} ==> Unhealthy`)
            }
            else if(air_quality >200 && air_quality <=300){
                setMsg(`AQI = ${air_quality} ==> Very Unhealthy`)
            }
            else if(air_quality >300){
                setMsg(`AQI = ${air_quality} ==> Hazardous`)
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