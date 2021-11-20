import React,{useContext,useState} from 'react'
import { AccountContext } from './accountContext';
import './SignUp.css'
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
  } from "./common";
import Axios  from 'axios';
function SignUp() {
    const [username ,setUserName] = useState("")
    const [pass ,setPass] = useState("")
    const { switchToSignin,switchToUserSpace } = useContext(AccountContext);
    function signUpHandler(){
        Axios.post("http://localhost:3001/usercheck",{username,pass}).then((res)=>switchToUserSpace())
    }
    return (

        <div className="box-container">
            <div className="form-container">
            <Input type="username" placeholder="User Name" onChange={(e)=>setUserName(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
            <SubmitButton type="submit" onClick={signUpHandler}>Sign Up</SubmitButton>
            <MutedLink href="#">
            Already Have  an accoun?{" "}
            <BoldLink href="#" onClick={switchToSignin}>
          Login
        </BoldLink>
        </MutedLink>
        </div>
    </div>
    )
}

export default SignUp
