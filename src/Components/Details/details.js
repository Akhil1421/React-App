import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./details.css"

const Details = ({search})=>{
    let {id} = useParams();
    id = Number(id)
    console.log(search)
    let navigate = useNavigate()
    let [single, setSingle] = useState([])
    let fetchData = async()=>{
        let response = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`)
        setSingle(response.data.filter((show)=>{
            return show.show.id === id
        }))
    }
    useEffect(()=>{
        fetchData()
    },[])
    console.log(single)
    let show = single.map((show)=>{
        let x = `${show.show.summary.split('<p>').join('').split('</p>').join('').split('<b>').join('').split('</b>').join('')}`
        return(
            <div className="textCenter" key='only'>
                <div className="img mid">
                    <img src={show.show.image.medium} alt="pic"/>
                </div>
                <div className="one">
                <h1>{show.show.name}</h1>
                <p className="para">
                    {x}
                </p>
                </div>
                <div className="less-distance mid">
                    <div>Rating : {show.show.rating.average}</div>
                    <div>Status : {show.show.status}</div>
                    <div>Genre : {show.show.genres.map((genre,index)=>{
                        if(index!==show.show.genres.length-1)return genre+' , '
                        else return genre
                    })}</div>
                    <div>Language : {show.show.language}</div>
                    <div>Premiered from : {show.show.premiered}</div>
                    <div>Ended On : {show.show.ended!==null ? show.show.ended : "-"}</div>
                </div>
            </div>
        )
    })
    let [showForm, setShowForm] = useState(false)
    let name = useRef()
    let movie = useRef()
    let date = useRef()
    let time = useRef()
    let handleSbt = (e)=>{
        e.preventDefault()
        let info = {
            "name" : name.current.value,
            "movie" : movie.current.value,
            "date" : date.current.value,
            "time" : time.current.value
        }
        localStorage.setItem("info", JSON.stringify(info))
        setShowForm(false)
        alert("Your Show has been booked")
    }
    let goBack = ()=>{
        navigate("/")
    }
    return(
        <div className="single">
            {show}
            <div className="opts"><button onClick={()=>setShowForm(!showForm)}>Book a Show</button>
                <button onClick={goBack}>Go Back</button>
            </div>
            {showForm &&
                <div className="mid">
                <form className="less-distance border">
                    <label>Name</label>
                    <input type="text" placeholder="Name" id="name" ref={name}></input>
                    <label>Show</label>
                    <input type="text" defaultValue={`${single[0].show.name}`} id="movie"ref={movie} readOnly={true}/>
                    <label>Date</label>
                    <input type="text" placeholder="Date" id="Date" ref={date}/>
                    <label>Time</label>
                    <input type="text" placeholder="Time" id="Time" ref={time}/>
                    <div className="opts">
                    <button type="Submit" onClick={handleSbt}>Submit</button>
                    <button onClick={()=>setShowForm(!showForm)}>Cancel</button>
                    </div>
                </form>
                </div>
            }
        </div>
    )
}

export default Details