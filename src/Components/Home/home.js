import React from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from "axios";

const Home = ({dataArray,setDataArray})=>{
    let navigate = useNavigate()
    let shows= []  
    let fetchData = async()=>{
        let response = await axios.get("https://api.tvmaze.com/search/shows?q=mystar")
        setDataArray(response.data)
        console.log(response.data)
    }
    useEffect(()=>{
      fetchData()
    },[])
    let handleClick = (ind)=>{
        navigate(`/details/${dataArray[ind].show.id}`)
    }
    shows = dataArray.map((showDetails, ind)=>{
        return(
            <div className="ind-show" key={showDetails.show.id} id={ind} onClick={()=>handleClick(ind)}>
                {showDetails.show.image  && <img src={showDetails.show.image.medium} alt="showImage"/>}
                {!showDetails.show.image && <img src='NotAvailable.jpg' alt="Image Not Available" />}
                <div className="mid">
                    <h4>{showDetails.show.name}</h4>
                </div>
                <div className="distance">
                    <span>{showDetails.show.language}</span>
                    <span>{showDetails.show.type}</span>
                </div>
            </div>
        )
    })
    return(
        <div className="home">
            <div className="mid"><h2>Popular Shows</h2></div>
            <div className="all-shows">
                {shows}
            </div>
        </div>
    )
}

export default Home