import "./home-right.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

const HomeRight = ( detailsID ) => {

    const userExists = useSelector((stores) => stores.lucia.user[0]);
    const listItems = useSelector((stores) => stores.sofia.leads)

    const [isDetails, setIsDetails] = useState([])
    const [isEditing, setIsEditing] = useState(true)
    const [editedDetails, setEditedDetails] = useState({
        amount: "",
        is_type: "",
        is_comment: ""
    })
    const [statusList, setStatusList] = useState([]);

    const {amount, is_type, is_comment} = editedDetails;

    const token = userExists;

    const {details_id} = detailsID

    const [number1] = listItems;

    useEffect(() => {
      number1
            .map((item) => {
                console.log("is item xxxxxxxxxx", item.timestamp)
            })

    }, [])

    const getStatusList = async () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        }
        try {
            const request = await axios.get("http://localhost:8000/status", config)
            setStatusList(request.data);
        } catch (error) {
            console.log("status", error)
        }
    }

    const filterDetails = () => {
        const filtered = number1.filter((item) => item.details_id === detailsID.detailsID)
        console.log("is filtered", filtered)
        setIsDetails(filtered)
    }


useEffect(() => {
        filterDetails()
    }, [])

    /*useEffect(()=> {
        getDetails()

    }, [])*/



    const handleOnClick = () => {
        if(!isEditing){
            setIsEditing(true);
        } else {
            setIsEditing(false)
        }

    }

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setEditedDetails({...editedDetails, [name]: value})
    }

    const handleSubmit = () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        }
        try {
            const request = axios.patch(`http://localhost:8000/update-details/${detailsID.detailsID}`, editedDetails, config)
            console.log("updated ", request.data)
        } catch (error) {
            console.error(error)
        }
        console.log("edited details", editedDetails)
    }

    useEffect(() => {
        getStatusList()
    }, [])

    useEffect(() => {
        console.log("is status list", statusList)
    }, [statusList])

    return(

        <div className="main-container-right">
            <h1>home right</h1>

            {
                isDetails
                    .map((item) => {

                            const {details_id, type, name, referral_amount, comment} = item;
                        return(
                            <>
                                <small>ID: {details_id}</small>
                                <h2>{name}</h2>
                                <div >
                                    <button onClick={handleOnClick}>{isEditing ? "Edit" : "Save"}</button>
                                    <div><h3> Referral Amount:</h3> ${isEditing ? <h3>{amount ? amount : referral_amount}</h3> : <input type="text" name="amount" value={amount} onChange={handleOnChange} />}</div>
                                </div>

                                <label htmlFor="is_type">Status</label>
                                <select name="is_type" id="is_type" value={is_type} onChange={handleOnChange}>
                                    <option disabled={true}>select</option>
                                    {
                                        statusList
                                            .map((item) => {

                                                const {status_id, type} = item;
                                                return(
                                                    <>

                                                        <option value={status_id} >{type}</option>
                                                    </>

                                                )
                                            })
                                    }

                                </select>
                                <div>
                                    <label htmlFor="is_comment">Comment</label>
                                    {
                                        !isEditing ? <textarea name="is_comment" id="is_comment" cols="30" rows="10" value={is_comment} onChange={handleOnChange}></textarea> : comment
                                    }


                                </div>
                            </>

                        )
                    }

                    )


            }

        <button onClick={handleSubmit}>Submit</button>

        </div>
    )
}

export default HomeRight;