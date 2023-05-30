import { useEffect, useState } from "react";
import Composer from "./Composer";
import { useDispatch,useSelector } from "react-redux";
import { authActions ,inboxActions,sentActions} from "../../store.Index";
import { useNavigate } from "react-router-dom";
import Inbox from "../mailbox/Inbox";
import 'bootstrap/dist/css/bootstrap.css'
import Sent from "../mailbox/Sent";


const Home = () =>{
    
    const navigate=useNavigate();
    const currEmail=useSelector(state=>state.auth.email);
    const ccurrEmail=currEmail.replace(/[^a-zA-Z0-9]/g,'');
    const dispatch=useDispatch();
    useEffect(()=>{
        if(currEmail===''){
            navigate('/login');
        }
        
        async function fetchInboxData(){
            const res = await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/inbox/${ccurrEmail}.json`);
            if(res.ok){
            const data=await res.json();
            console.log(data);
            if(data===null){
                return
            }
                const loadedinbox=[];
                for(const key of Object.keys(data)){
                    let temp={
                        id:key,
                        senderEmail:data[key].senderEmail,
                        subject:data[key].subject,
                        message:data[key].message,
                        receiverEmail:data[key].receiverEmail
                    }
                    loadedinbox.push(temp);
                }
                dispatch(inboxActions.getInbox(loadedinbox))
            }else{console.log('error in inboxfetch')}
        }
        async function fetchSentData(){
            const res = await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/sent/${ccurrEmail}.json`);
            if(res.ok){
            const data=await res.json();
            console.log(data);
            if(data===null){
                return
            }
                const loadedsent=[];
                for(const key of Object.keys(data)){
                    let temp={
                        id:key,
                        senderEmail:data[key].senderEmail,
                        subject:data[key].subject,
                        message:data[key].message,
                        receiverEmail:data[key].receiverEmail
                    }
                    loadedsent.push(temp);
                }
                dispatch(sentActions.getSent(loadedsent))
            }else{
                console.log("something wrong in sentfetch")
            }
        }
        fetchInboxData();
        fetchSentData();
    },[]);
    
    const inbox = useSelector(state=>state.inbox.inbox);
    const sent = useSelector(state=>state.sent.sent);
    const [toggleComposer,setToggleComposer]=useState(false);
    const [inboxActive,setInboxActive] = useState(false);
    const [sentActive,setSentActive] = useState(false);
    const logout = ()=> {
        dispatch(authActions.logout());
        navigate('/login');
    }
    const composeHandler=()=>{
        setToggleComposer((prevState)=>!toggleComposer);
    }

    const showInbox = () =>{
        setInboxActive(true);
        setSentActive(false)
    }
    const showSent = () =>{
        console.log("sent clicked")
        setSentActive(true);
        setInboxActive(false);
    }
    const inboxItems=<ul className="list-group">{inbox.map((item)=>{if(inbox.length===0){return}
        else{return (<Inbox id={item.id}  key={item.id} item={item} subject={item.subject} senderEmail={item.senderEmail} message={item.message} receiverEmail={item.receiverEmail} />)}
    })}</ul>
    const sentItems=<ul className="list-group">{sent.map((item)=>{
        return (<Sent id={item.id}  key={item.id} item={item} subject={item.subject} senderEmail={item.senderEmail} message={item.message} receiverEmail={item.receiverEmail} />)
    })}</ul>
    console.log("checkkkkin"+sentItems)
    return(<div className="justify-content-between">
        <h2>Welcome to Mailbox</h2>
            <div className="d-flex justify-content-center">
                <button onClick={logout} className="btn btn-danger mr-3">Logout</button>
                <button onClick={showInbox} className="btn btn-primary ml-3">Inbox</button>
                <button onClick={showSent} className="btn btn-primary mr-3">Sent</button>
            </div>
        {inboxActive && inboxItems}
        {sentActive && sentItems}
        <button onClick={composeHandler} className="btn btn-secondary m-10">Compose mail</button>
        {toggleComposer && <Composer className="mt-10"/>}
    </div>)
}

export default Home;