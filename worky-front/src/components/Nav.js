import {Link} from "react-router-dom";
import { signOut } from "../features/users/userAuth";
import {useDispatch} from "react-redux";

const Nav = () => {

    const dispatch = useDispatch();

    return(
        <nav>
            <div>
                <h1><Link to={"/"}>Worky</Link></h1>
            </div>
            <div>
                <ul>
                    <li><Link to={"/signup"}>Signup</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                </ul>
            </div>
            <div>
                <button onClick={() => dispatch(signOut())}>Log out</button>
            </div>
        </nav>


    )
}

export default Nav;