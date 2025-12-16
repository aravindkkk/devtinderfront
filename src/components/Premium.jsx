import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from "../utils/constants";
const Premium = () => {

  const [ isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async() =>{
    const res = await axios.get(BASE_URL + "/premium/verify", {withCredentials:true});

     if(res.data.isPremium){

      setIsUserPremium(true);
          
     }
  }

  const handleBuyClick = async (type) => {

     try {
      const order = await axios.post(BASE_URL + "/payment/create",
          { membershipType:type },
          {withCredentials:true}
      );
      const {keyId,amount,currency,notes,order_id} = order.data;
      const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits.
            currency: currency,
            name: "Div Tinder",
            description: 'Test Transaction',
            order_id: order_id, // This is the order_id created in the backend
            prefill: {
              name: notes.firstName + ' ' + notes.lastName,
              email: notes.emailId,
              contact: '9999999999'
            },
            theme: {
              color: '#F37254'
            },
            
            handler:{ 
              verifyPremiumUser,
            },
          };
        
          const rzp = new window.Razorpay(options);
          rzp.open();
    } catch (err){
      setError(err.response.data);
    }

  }
  return isUserPremium?  ( "You are already a premium user ..!" ) : (
    
    <div className='m-10'>
        <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membershp</h1>
            <ul>
                <li> - chat with othe people</li>
                 <li> - 100 connection per day</li>
                  <li> - Blue Tick</li>
                  <li> - 3 Months</li>
            </ul>
            <button onClick={() => handleBuyClick("silver")} className="btn btn-primary">Buy Sliver</button>
            </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membershp</h1>
             <ul>
                <li> - chat with othe people</li>
                 <li> - 1000 connection per day</li>
                  <li> - Blue Tick</li>
                 <li> - 6 Months</li>
            </ul>
            <button onClick={() =>handleBuyClick("gold") } className="btn btn-secondary">Buy Gold</button>
            </div>
        </div>
    </div>
  ) 
}

export default Premium