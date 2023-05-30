import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
const Inbox = ({senderEmail,subject,message,id,item,read,receiverEmail})=>{
    const [toggle,setToggle] = useState();

    const openEmail = ()=>{
        setToggle(prevState=>!toggle);
        function updateEmailStatus(){
            const newItem={...item,read:true};
            console.log(newItem)
            const creceiverEmail=receiverEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/inbox/${creceiverEmail}/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(newItem)
            })
        }
        updateEmailStatus();
    }
    return(<li className='list-group-item' >
        <button className="btn btn-warning" onClick={openEmail}>Open</button>
        <div>
            {toggle && <div>
            <span>From:{senderEmail}</span> <br></br>
            <span>Subject:{subject}</span> <br/>
            <p>Message:{message}</p></div>}    
        </div>
            
    </li>)
}

export default Inbox;