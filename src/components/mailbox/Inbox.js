import 'bootstrap/dist/css/bootstrap.css'
const Inbox = ({senderEmail,subject,message})=>{
    return(<li className='list-group-item'>
        <span>From:{senderEmail}</span>
        <span>Subject:{subject}</span>
        <p>{message}</p>
    </li>)
}

export default Inbox;