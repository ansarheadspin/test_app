import React,{useContext, useState} from 'react'
import './Login.css'
import { AccountContext } from "./accountContext";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
  } from "./common";
import Axios  from 'axios';
function Login() {
    const [username ,setUserName] = useState("")
    const [pass ,setPass] = useState("")
    const [status,setStatus] = useState([])
    const { switchToSignup ,switchToUserSpace,currentUser,setUser} = useContext(AccountContext);
    function showError (){
        alert("wrong credentials")
    }
    function loginHandler (event){
        event.preventDefault();
            console.log(username)
            console.log(pass)
            Axios.get(`http://localhost:3001/usercheck/${username}/${pass}`,{user:username,password:pass}).then((res)=>{
                console.log(res.data)
                if(res.data.length != 0){
                    switchToUserSpace()
                    setUser(username)
                }
                else showError()
            })

        }
    return (
        <div className="box-container">
            <div className="form-container">
            <Input type="username" placeholder="Username"  onChange={(e)=>setUserName(e.target.value)}/>
            <Input type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)}/>
            <SubmitButton type="submit" onClick={loginHandler}>Log in</SubmitButton>
            <MutedLink href="#">
            Don't have an accoun?{" "}
            <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
        </MutedLink>
        </div>
    </div>
    )
}

export default Login
