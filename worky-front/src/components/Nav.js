import {Link} from "react-router-dom";
import { signOut, saveToLocal, loggedUser} from "../features/users/userAuth";
import {useDispatch, useSelector} from "react-redux";
import {stores} from "../store";
import {useEffect, useState} from "react";
//import { getUSerState } from "../features/leads/leadSlice";

const Nav = () => {

    const dispatch = useDispatch();
    const fetchedUser = useSelector((store) => store.lucia.user)
    const [savedUser, setSavedUser] = useState("");



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("isUser"))
        if(user){
            console.log("has", user)
           dispatch(loggedUser(user))
           //dispatch(getUSerState(user))
        }
    }, [])


    return(
        <nav>
            <div>
                <h1><Link to={"/"}>Worky</Link></h1>
            </div>
            <div>
                {
                    fetchedUser.length > 0&& (
                        <div>
                            <span>hello {fetchedUser[0].email}</span>
                            <div>
                                <button onClick={() => dispatch(signOut())}>Log out</button>
                            </div>
                        </div>

                    )
                }
                {
                    fetchedUser.length === 0 && (
                        <ul>
                            <li><Link to={"/signup"}>Signup</Link></li>
                            <li><Link to={"/login"}>Login</Link></li>
                        </ul>
                    )
                }
            </div>

        </nav>


    )
}

export default Nav;