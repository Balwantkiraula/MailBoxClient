
import { useRef ,useEffect} from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/Index";

const SignUp = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log("not done")
    },[])
    const navigate=useNavigate();

    const emailRef=useRef();
    const passwordRef=useRef();
    const cpasswordRef=useRef();

    const signupHandler = async (e) =>{
        e.preventDefault();
        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        const cpassword=cpasswordRef.current.value;
        if(password!==cpassword){
            return;
        }
        const user={
            email:email,
            password:password,
            returnSecureToken:true
        }
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfoPwO0ULnk4ApUv1ImaDvLlCpo_747T8',{
            method:'POST',
            body:JSON.stringify(user),
        })
        if(res.ok){
            const data=await res.json();
            localStorage.setItem('userEmail',data.email);
            dispatch(authActions.auth(data.email));
            console.log(data.email);
            navigate('/home');
        }else{
            console.log("error");
        }
    }

    return(<div>
            <form onSubmit={signupHandler}>
                <h4>SignUp</h4>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef} required></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwordRef} required></input>
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" id="cpassword" ref={cpasswordRef} required></input>
                <button type="submit">Sign Up</button>
                <Link to='/login'>Already have an account? Login</Link>
            </form>
        </div>)
}


export default SignUp;

