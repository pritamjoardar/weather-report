"use client"
import React,{useEffect, useState} from 'react'
import { IoIosSearch } from "react-icons/io";
import Image from 'next/image';
import Clear from "./assets/clear.png"
import Cloud from "./assets/cloud.png"
import drizzle from "./assets/drizzle.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import mist from "./assets/mist.png"



import Humidity from './assets/humidity.png'
import Wind from './assets/wind.png'
import axios from 'axios';
const Home = () => {
  const [city, setCity] = useState<string>("kolkata");
  const [name, setName] = useState<string>("");
  const [wind,setWind]= useState<number>(0);
  const [temp,setTemp]= useState<number>(0);
  const [humi,setHumi]= useState<number>(0);
  const [weather, setWeather] = useState<string>("");
  const [Error,setError]= useState<string>('');
  const GetData = async() =>{
    try {
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.NEXT_PUBLIC_KEY}`)
      .then(({data})=>{
       setTemp(data?.main?.temp);
       setHumi(data?.main?.humidity);
       setWind(data?.wind?.speed);
        setWeather(data?.weather[0].main)
       setName(data?.name);
       setError('');
      })
      .catch((error)=>{
        setError(error?.response?.data?.message);
         console.log(error);
       })

    } catch (error) {

      console.log(error);
    }

  }
  useEffect(()=>{
    GetData();
  },[])
  return (
    <>
    <div className="w-screen h-screen  flex bg-gradient-to-r from-violet-200 to-pink-200">
      <span className="bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-lg  flex flex-col justify-center m-auto w-min  p-3 h-[30rem] md:p-10 md:h-[40rem]">
      <span className="flex border items-center justify-center w-fit rounded-full overflow-hidden px-2 bg-white">
      <input onChange={(e)=>setCity(e.target.value)} type="search" name="search" placeholder='kolkata' id=""  className='p-2  outline-none w-[14rem] md:w-[30rem]'/>
      <button onClick={()=>GetData()} className='px-2 text-2xl'><IoIosSearch /></button>
      </span>
      <div className='flex justify-center mt-2'><p className='text-white'>{Error}</p></div>
      <div className="flex flex-col m-auto justify-center items-center text-3xl text-white font-bold">
      {weather.toLowerCase()=="clear" && (
        <Image src={Clear.src} alt='weather condition' width={100} height={100}/>
           )}
                 {weather.toLowerCase()=="clouds" && (
        <Image src={Cloud.src} alt='weather condition' width={100} height={100}/>
           )}      {weather.toLowerCase()=="rain" && (
            <Image src={rain.src} alt='weather condition' width={100} height={100}/>
               )}      {weather.toLowerCase()=="drizzle" && (
                <Image src={drizzle.src} alt='weather condition' width={100} height={100}/>
                   )}      {weather.toLowerCase()=="mist" && (
                    <Image src={mist.src} alt='weather condition' width={100} height={100}/>
                       )} 
                       {weather.toLowerCase()=="snow" && (
                    <Image src={snow.src} alt='weather condition' width={100} height={100}/>
                       )}     
                      
      <h1>{temp}</h1>
      <p>{name}</p>
      </div>
      <span className="flex justify-between">
        <div className="flex items-center gap-2">
        
            <Image src={Humidity.src} alt='weather condition' width={50} height={50} className='w-[2rem]'/>
       
      <span className="text-white font-bold">
        <h1>{humi}%</h1>
        <p>Humidity</p>
      </span>  
        </div>
        <div className="flex items-center gap-2">
      <Image src={Wind.src} alt='weather condition' width={50} height={50} className='w-[2rem]'/>
      <span className="text-white font-bold">
        <h1>{wind}km/h</h1>
        <p>Wind Speed</p>
      </span>  
        </div>
      </span>
      </span>
    </div>
    </>
  )
}

export default Home
