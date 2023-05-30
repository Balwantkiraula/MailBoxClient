import 'bootstrap/dist/css/bootstrap.css'

const Sent = ({receiverEmail,subject,message})=>{
    return(<li className='list-group-item'>
        <span>To:{receiverEmail}</span>
        <span>Subject:{subject}</span>
        <p>Message:{message}</p>
    </li>)
}

export default Sent;