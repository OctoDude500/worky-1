import {Link} from "react-router-dom";

const Nav = () => {
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
        </nav>


    )
}

export default Nav;