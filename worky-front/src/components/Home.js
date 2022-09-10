import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLeads } from "../features/leads/leadSlice";



const  Home = () => {

    const dispatch = useDispatch();
    const userExists = useSelector((stores) => stores.lucia.user)
    const listItems = useSelector((stores) => stores.sofia.leads)



    useEffect(() => {
            if(userExists) {
                dispatch(getLeads())
                console.log("use effect in home")
            }
        }, [dispatch, userExists])

    return(
        <div>
            {
                userExists.length > 0 &&
                (listItems
                    .map((item) => {
                        const {name, email, language, applicant_id, comment} = item

                        return(
                            <div>
                                <p>{applicant_id}</p>
                                <p>{name}</p>
                                <p>{email}</p>
                                <small>{language}</small>
                                <p>{comment}</p>
                            </div>
                        )
                    }))
            }
            {
                userExists.length === 0 && (<div><p>nothing</p></div>)
            }
            {/*<button onClick={() => dispatch(testFunction("name"))}>click</button>*/}
        </div>
    )
}

export default Home;