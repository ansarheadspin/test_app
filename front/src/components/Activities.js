import React ,{useEffect,useState} from 'react';
import Axios from 'axios';
function Activities() {
    const [Activity_list,setActivities] = useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/all-activities").then((res)=>{
            setActivities(res.data)
        })
    },[])
    return (
        <div>
            {Activity_list.map((val) =>{
                return <div>
                    <p>{val.eventID}</p>
                    <p>{val.userName}</p>
                    </div>
            })}
            
        </div>
    )
}

export default Activities
