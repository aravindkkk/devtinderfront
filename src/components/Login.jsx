import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginFrom, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogin = async() => {
        try{

           const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password
                },
                { withCredentials: true }//for cors error 
            )
            dispatch(addUser(res.data));
            return navigate("/")
        } catch (err) {
           setError(err.response.data);
            console.error(err);
        }
    }

    const handleSignUp = async() => {
      
      try{

        const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);
      dispatch(addUser(res.data.data));
      return navigate("/profile");

      }catch(error) {
        setError(err.response.data);
        console.error(err);

      }

    }

  return (
    <div className='flex justify-center my-10'>
 <div className="card bg-base-200 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">
            {isLoginFrom ? "Login" : "Signup"}
    </h2>
    <div>
       {!isLoginFrom && (
         <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">FirstName</legend>
        <input type="text" value={firstName} className="input" onChange={(e) => setFirstName(e.target.value)} />
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">LastName</legend>
        <input type="text" value={lastName} className="input" onChange={(e) => setLastName(e.target.value)} />
        </fieldset>
        </ >
       )}
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Email</legend>
        <input type="text" value={emailId} className="input" onChange={(e) => setEmailId(e.target.value)} />
        </fieldset>
         <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
        </fieldset>
    </div>
     <p className="text-red-500 text-center">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginFrom ? handleLogin : handleSignUp}>{isLoginFrom ? "Login" : "Signup"}</button>
    </div>
     <p className=" text-center cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)} >
            {isLoginFrom ? "New user ? signup here" : "Existing User ? Login here"}
     </p>
  </div>
</div></div>
  )
}

export default Login