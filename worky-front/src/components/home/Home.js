import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLeads, clearState } from "../../features/leads/leadSlice";
import HomeRight from "../home_right/HomeRight";
import "./home.css";



const  Home = () => {

    const dispatch = useDispatch();
    const userExists = useSelector((stores) => stores.lucia.user[0])
    const listItems = useSelector((stores) => stores.sofia.leads)

    const token = userExists

    const [isOpen, setIsOpen] = useState(false);
    const [isDetails, setIsDetails] = useState("");

    const handleOnClick = (details_id, referral_amount, type, comment, name) => {

        if(!isOpen) {
            setIsOpen(true);
            setIsDetails(details_id)

        } else {

            setIsOpen(false);
            setIsDetails(details_id)

        }



    }



    useEffect(() => {


                //dispatch(getLeads({token}))
                dispatch(getLeads({token}))
                console.log("use effect in home")
                console.log("222")


        }, [])




    return(
        <>
            <div className="main-container">
                <div className="content-container" >
                    {
                        userExists&&
                        (listItems
                            .flat()
                            .map((item, index) => {
                                const {name, email, language, applicant_id, comment, type, workplace, details_id, timestamp, referral_amount} = item
                                const x = new Date(timestamp).toLocaleDateString('en-US')
                                return(
                                    <div key={index} className="content-card" onClick={() => handleOnClick(details_id)}>

                                        <p>{applicant_id}</p>
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <small>{language}</small>
                                        <p>{referral_amount}</p>
                                        <p>{comment}</p>
                                        <p>{type}</p>
                                        <p>{workplace}</p>
                                        <p>details id {details_id}</p>
                                        <p>created on: {x}</p>
                                    </div>
                                )
                            }))
                    }

                    {
                        //*userExists.length === 0 && (<div><p>nothing</p></div>)*/
                    }
                    {/*!userExists && (
                <h1>Welcome to worky backend</h1>
            )*/}
                </div>
                {/*isOpen && <HomeRight detailsID={isDetails}/>*/ }
                { isOpen && <HomeRight detailsID={isDetails}/> }
            </div>

        </>
    )
}

export default Home;