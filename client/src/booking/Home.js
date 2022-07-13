import React from 'react'
import { useSelector,useStore } from 'react-redux'
const Home = () => {
  const state=useSelector((state)=>state)
  return (
    <div className='container-fluid h1 p-5 text-center'>Home page {JSON.stringify(state)}</div>
  )
}

export default Home