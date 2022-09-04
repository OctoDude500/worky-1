import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { signUpUser } from "../features/users/userAuth";
import { saveToLocal } from "../features/users/userAuth";


const SignUp = () => {

    const dispatch = useDispatch();
    const userResponse = useSelector((store) => store.lucia.user)

    //array destructuring
    const [first] = userResponse


    const [text, setText] = useState({
        email: "",
        password:""
    })

    const {email, password} = text;

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setText({...text, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUpUser({text}))
    }

    useEffect(() => {
        if(userResponse[0]){
            dispatch(saveToLocal())
            console.log("signup useeffect", userResponse)
        }
    }, [userResponse])


    return(
        <>
            {first && (<div>
                <p>{first.token}</p>
                <p>{first.email}</p>
            </div> )}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    id="email"
                    onChange={handleOnChange}/>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    value={password}
                    id="password"
                    onChange={handleOnChange}/>
            </div>
            <div>
                <button type="submit">signup</button>
            </div>
        </form>

        </>
    )
}

export default SignUp;