import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inboxActions } from '../../store/Index';

const Inbox = ({ senderEmail, subject, message, id, item, read, receiverEmail, date }) => {
    const [toggle, setToggle] = useState(true); // Modified state initialization
    const inboxChanging = useSelector(state => state.inbox.idata);
    const dispatch = useDispatch();

    const deleteEmail = async () => {
        const creceiverEmail = receiverEmail.replace(/[^a-zA-Z0-9]/g, '');
        const res = await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/inbox/${creceiverEmail}/${id}.json`, {
            method: 'DELETE',
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(inboxActions.changingInbox(data));
            console.log("deleted");
        } else {
            console.log('error in deleting');
        }
    }

    return (
        <li className='list-group-item'>
            <button className="btn btn-warning" onClick={deleteEmail}>Delete</button>
            <div className={read === true ? "bg-dark" : "bg-light"}>
                <div>
                    <span>From: {senderEmail}</span> <br />
                    <span>Subject: {subject}</span> <br />
                    <p>Message: {message}</p>
                    <span>{date}</span>
                </div>
            </div>
        </li>
    )
}

export default Inbox;
