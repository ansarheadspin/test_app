import Axios  from 'axios';
import React,{useContext, useState,useEffect} from 'react'
import { AccountContext } from "./accountContext";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
  } from "./common";
function UserSpace() {
    const { switchToLogin,currentUser} = useContext(AccountContext);
    const [userMsgList,setUserMsgList] = useState([]) 
    const [msg,setMsg] = useState("")
    const [editMode,setEditMode] = useState("")
    useEffect(() => {
        Axios.get(`http://localhost:3001/messages/${currentUser}`).then((res)=>{
        console.log(res.data);
        setUserMsgList(res.data);
    })
    }, [setUserMsgList,msg])
    function edithandler(id){
        setEditMode(id)
    }
    function deletehandler(msgID)
        {   console.log(msgID)

        Axios.delete(`http://localhost:3001/messages/delete/${msgID}`,
            {
            msgID:msgID
            }).then((res)=>{
            console.log(res.data);
            setUserMsgList(userMsgList.filter((val)=>val.msgID != msgID))

        })
        }
    function addhandler()
    {   

        Axios.post("http://localhost:3001/messages/add/",
            {
            username:currentUser,
            message:msg
            }).then((res)=>{
            console.log(res.data);
            setMsg("")

        })
    }
    function updatehandler(id)
    {   

        Axios.put("http://localhost:3001/messages/update/",
            {
            msgID:id,
            msg:msg
            }).then((res)=>{
            console.log(res.data);
            setMsg("")
            setEditMode("")

        })
    }

        
    return (
        <div>
            <div>
                welcome user

            </div>
            <SubmitButton type="button" onClick={switchToLogin}>Log Out</SubmitButton>
            <Input type="text" placeholder="msg" onChange={(e)=>setMsg(e.target.value)}/>
            <button onClick={()=>addhandler()} >Add messege</button>
            {userMsgList.map((val)=>{

                return val.msgID == editMode ? 
                    <div>
                        <input type ="text" onChange={(e)=>setMsg(e.target.value)}></input>
                        <button onClick={()=>updatehandler(val.msgID)}>Update</button>
                    </div>
                    :
                    <div>
                        <p>{val.message}</p>
                        <button onClick={()=>deletehandler(val.msgID)}>delete</button>
                        <button onClick={()=>edithandler(val.msgID)}>edit</button>
                    </div>
            }) }
        </div>
    )
}

export default UserSpace
