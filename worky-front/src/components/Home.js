import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLeads, clearState } from "../features/leads/leadSlice";



const  Home = () => {

    const dispatch = useDispatch();
    const userExists = useSelector((stores) => stores.lucia.user[0])
    const listItems = useSelector((stores) => stores.sofia.leads)

    const token = userExists

    useEffect(() => {
        dispatch(clearState())
    }, [])

    useEffect(() => {
            if(userExists) {

                //dispatch(getLeads({token}))
                dispatch(getLeads({token}))
                console.log("use effect in home")
                console.log("222")

            }
        }, [userExists])


    return(
        <div>
            {
                userExists&&
                (listItems
                    .flat()
                    .map((item, index) => {
                        const {name, email, language, applicant_id, comment} = item

                        return(
                            <div key={index}>
                                <p>test leads</p>
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
                //*userExists.length === 0 && (<div><p>nothing</p></div>)*/
            }
            {!userExists && (
                <h1>Welcome to worky backend</h1>
            )
            }
        </div>
    )
}

export default Home;