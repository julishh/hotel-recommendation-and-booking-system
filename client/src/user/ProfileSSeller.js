import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import ProfileNav from '../components/ProfileNav'
import RoomDisplay from '../components/cards/RoomDisplay'
import NavigationBar from '../components/NavigationBar'

import { sellerHotels } from '../actions/hotel'
import { useSelector } from 'react-redux'

const ProfileSSeller = () => {
    const {auth}=useSelector((state)=>({...state}))
    const[hotels,setHotels]=useState([]);

    useEffect(()=>{
        loadSellersHotels();
    },[]);

    const loadSellersHotels=async()=>{
        let {data}=await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
        setHotels(data);
    }

    // const loadAllHotels=async()=>{
    //     const res= await axios.get(`${process.env.REACT_APP_API}/hotels`)
         
    //      setHotels(res.data)
    //    } 

    const connected=()=>(
        <div className='container-fluid'>
           
            <div className='row'>
                <div className='col-md-10'>
                    <h2>your Hotels</h2>
                    <h2>this is from connected function</h2>

                </div>
                <div className='col-md-2'>
            <Link to='/hotel/new' className='btn btn-primary'> Add New</Link>
        </div>

            </div>

            <div className='row'>
                {
                    hotels.map((h)=>(
                        <RoomDisplay key={h._id} h={h} showMoreButton={false} owner={true}></RoomDisplay>
                    ))
                }
            </div>
            
        </div>
    )

    const notConnected=(
        <></>
    )
    
  return (
    <>
    <div className="container-fluid navimage p-5 text-center ">
        <h1>my profile</h1>
      </div>
      <div className='container-fluid '>


      </div>
      {connected()}
      {/* <div className='container'>show all hotels i have posted</div> */}

      {/* this is before connected function is created */}

{/* <div className='container-fluid'>
    <div className='row'>
        <div className='col-md-10'>
         <h1>your hotels</h1>
         <h1>this is new seller</h1>
        </div>
        <div className='col-md-2'>
            <Link to='/hotel/new' className='btn btn-primary'> Add New</Link>
        </div>

    </div>

</div> */}

    </>
  )
}

export default ProfileSSeller