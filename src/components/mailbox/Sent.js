import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';

const Sent = ({receiverEmail,subject,message,senderEmail,item,id,read})=>{
    const [toggle,setToggle] = useState();
    const openEmail = ()=>{
        setToggle(prevState=>!toggle);
        function updateEmailStatus(){
            const newItem={...item,read:true};
            console.log(newItem)
            const csenderEmail=senderEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/sent/${csenderEmail}/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(newItem)
            })
        }
        updateEmailStatus();
    }
    const deleteEmail = ()=>{
        
        function deleteEmailStatus(){
            
            
            const csenderEmail=senderEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/sent/${csenderEmail}/${id}.json`,{
                method:'DELETE',
                
            })
        }
        deleteEmailStatus();
    }




    return(<li className='list-group-item'>
        <button className="btn btn-warning" onClick={openEmail}>Open</button>
        <button className="btn btn-warning" onClick={deleteEmail}>Delete</button>
        <div>
            {toggle && <div><span>To:{receiverEmail}</span>
            <span>Subject:{subject}</span>
            <p>Message:{message}</p></div>}
        </div>
    </li>)
}

export default Sent;