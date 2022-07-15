import React from 'react'
import { useSelector,useStore } from 'react-redux'
const Home = () => {
  const {auth}=useSelector((state)=>state)
  return (
    <div className='container-fluid h1 p-5 text-center'>Home page {JSON.stringify(auth)}</div>
  )
}

export default Home