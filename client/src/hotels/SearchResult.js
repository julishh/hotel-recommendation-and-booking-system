import {useState,useEffect} from "react";
import queryString from "query-string"
import { Link } from "react-router-dom";
import SearchForm from "../components/forms/SearchForm";

import { searchListing } from "../actions/hotel";

import RoomDisplay from "../components/cards/RoomDisplay"

const SearchResult = () => {

    const [searchLocation,setSearchLocation]=useState("")
    const [searchDate,setSearchDate]=useState("")
    const [searchBed,SetSearchBed]=useState("")
    const [hotels,setHotels]=useState([])

    useEffect(()=>{
        const {location,date,bed}=queryString.parse(window.location.search)
        searchListing({location,date,bed}).then((res)=>{
          
          setHotels(res.data)
        })
        //console.table({bed,location,date})
    },[window.location.search],[hotels])
  return (
    <>
    <div className="col">
      <br />
      <SearchForm />
    </div>
    <div className="container">
      <div className="row">{hotels.map((h)=>(<RoomDisplay key={h._id} h={h}/>))}</div>
    </div>
    </>
  );
};

export default SearchResult;
