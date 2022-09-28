import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {loginUser} from "../../features/users/userAuth";
import  "./login.css"


const Login = () => {

    const dispatch = useDispatch();
    //const userResponse = useSelector((store) => store.lucia.user)
    const [text, setText] = useState({
        email: "",
        password: ""
    });

    const {email, password} = text;

    const handleOnchange = (e) => {
        const {name, value} = e.target
        setText({...text, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({text}))
    }

    /*useEffect(() => {
        if(userResponse[0]) {
            dispatch(saveToLocal())
            console.log("useEffect in Login", userResponse)
        }
    }, [userResponse])*/

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            id="email"
                            onChange={handleOnchange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name="password"
                            value={password}
                            id="password"
                            onChange={handleOnchange}/>
                    </div>
                </div>
                <div className="form-button">
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;