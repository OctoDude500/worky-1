import {useState} from "react";

const Login = () => {
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
        console.log(text)
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    id="email"
                    onChange={handleOnchange}/>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    value={password}
                    id="password"
                    onChange={handleOnchange}/>
            </div>
            <div>
                <button type="submit">Signup</button>
            </div>
        </form>
    )
}

export default Login;