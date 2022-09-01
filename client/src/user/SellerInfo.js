
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


import axios from 'axios'

const SellerInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [isSeller,setIsSeller]=useState(false)

  const history = useNavigate();


  useEffect(() => {
    checkSeller();
  }, []);

  const checkSeller =async() => {
    let {data}=await axios.get(`${process.env.REACT_APP_API}/sellerinfo`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setIsSeller(data.isSeller)
      
      
  };

  const goto=()=>{
    if(isSeller){
        history('/profile/seller')
    }
//     else(isSeller){
//         history
//     }
//   
}
  

  return(
    <>
    <h1>this is juli</h1>
    {goto()}
    
    </>
  )

 
};

export default SellerInfo;
