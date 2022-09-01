import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLeads } from "../features/leads/leadSlice";

import {testFunction} from "../features/leads/leadSlice";

const  Home = () => {

    const dispatch = useDispatch();
    const listItems = useSelector((stores) => stores.sofia.leads)



    useEffect(() => {
            dispatch(getLeads())

        }, [dispatch])

    return(
        <div>
            {
                listItems
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
                    })
            }
            {/*<button onClick={() => dispatch(testFunction("name"))}>click</button>*/}
        </div>
    )
}

export default Home;