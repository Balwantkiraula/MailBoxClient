import { useRef } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/Index";
import 'bootstrap/dist/css/bootstrap.css'

const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const emailRef=useRef();
    const passwordRef=useRef();
    //const cpasswordRef=useRef();

    const loginHandler = async (e) =>{
        e.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
         
         
        const user={
            email:email,
            password:password,
            returnSecureToken:true
        }
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfoPwO0ULnk4ApUv1ImaDvLlCpo_747T8',{
            method:'POST',
            body:JSON.stringify(user),
        })
        if(res.ok){
            const data=await res.json();
            localStorage.setItem('userEmail',data.email);
            dispatch(authActions.auth(data.email))
            navigate('/home')

        }else{
            console.log("error could not login");
        }
    }

    return(<div>
            <form onSubmit={loginHandler} className="form-group">
                <h4>Login</h4>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" ref={emailRef} required className="form-control"></input>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" ref={passwordRef} required className="form-control"></input>
                 
                <button type="submit" className="btn btn-dark">Login</button><br/>
                <Link to='/'>Dont have an account ,signup</Link>
            </form>
        </div>)
}


export default Login