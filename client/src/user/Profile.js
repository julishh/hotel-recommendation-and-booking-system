import React from 'react'
import ProfileNav from '../components/ProfileNav'

const Profile = () => {
  return (
    <>
    <div className="container-fluid navimage p-5 text-center ">
        <h1>my profile</h1>
      </div>
        <ProfileNav />

      <div className='container'>show all bookings</div>
    </>
  )
}

export default Profile