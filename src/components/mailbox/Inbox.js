import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { inboxActions } from '../../store/Index';
const Inbox = ({senderEmail,subject,message,id,item,read,receiverEmail})=>{
    const [toggle,setToggle] = useState();
    const inboxChanging=useSelector(state=>state.inbox.idata);
    const dispatch=useDispatch();

    const openEmail = ()=>{
        setToggle(prevState=>!toggle);
        async function updateEmailStatus(){
            const newItem={...item,read:true};
            console.log(newItem)
            const creceiverEmail=receiverEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/inbox/${creceiverEmail}/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(newItem)
            })
            if(res.ok){
                const data=await res.json();
                dispatch(inboxActions.changingInbox(data))
            }
        }
        updateEmailStatus();
    }
    const deleteEmail = ()=>{
        
        async function deleteEmailStatus(){
            
            
            const creceiverEmail=receiverEmail.replace(/[^a-zA-Z0-9]/g,'');
            const res=await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/inbox/${creceiverEmail}/${id}.json`,{
                method:'DELETE',
                
            })
            if(res.ok){
                const data = await res.json();
                dispatch(inboxActions.changingInbox(data))
                alert("deleted")
        }else{
            console.log('error in deleting')
        }
        }
        deleteEmailStatus();
    }
    return(<li className='list-group-item' >
        <button className="btn btn-warning" onClick={openEmail}>Open</button>
        <button className="btn btn-warning" onClick={deleteEmail}>Delete</button>
        <div>
            {toggle && <div>
            <span>From:{senderEmail}</span> <br></br>
            <span>Subject:{subject}</span> <br/>
            <p>Message:{message}</p></div>}    
        </div>
            
    </li>)
}

export default Inbox;