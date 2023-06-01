import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sentActions } from '../../store/Index';

const Sent = ({ receiverEmail, subject, message, senderEmail, item, id, read, date }) => {
    const [toggle, setToggle] = useState(true); // Modified state initialization
    const [color, setColor] = useState(false);
    const sentChanging = useSelector(state => state.inbox.data);
    const dispatch = useDispatch();

    const deleteEmail = async () => {
        const csenderEmail = senderEmail.replace(/[^a-zA-Z0-9]/g, '');
        const res = await fetch(`https://mailboxclient-8985c-default-rtdb.firebaseio.com/sent/${csenderEmail}/${id}.json`, {
            method: 'DELETE',
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(sentActions.changingSent(data));
            console.log("deletion successful");
        }
    }

    return (
        <li className='list-group-item'>
            <button className="btn btn-warning" onClick={deleteEmail}>Delete</button>
            <div className={read ? "bg-dark text-light" : "bg-light text-dark"}>
                <div className={read ? "bg-dark text-light" : "bg-light text-dark"}>
                    <span>To: {receiverEmail}</span><br />
                    <span>Subject: {subject}</span><br />
                    <p>Message: {message}</p>
                    <span>{date}</span>
                </div>
            </div>
        </li>
    )
}

export default Sent;
