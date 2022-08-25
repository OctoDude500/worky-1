const pool = require("../models/db");
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");
const validator = require("validator");


const signUp = async (is_email, is_password) => {
    //validation
    if(!is_email || !is_password) {
        throw Error("Please fill all fields");
    }
    //validate email and password
    if(!validator.isEmail(is_email)) {
        throw Error("Please enter a valid email")
    }
    if(!validator.isStrongPassword(is_password)) {
        throw Error("Password not strong enough")
    }

    //check if the email in use already exists
    const exists =  await pool.query(
            "SELECT email FROM users where email = $1",
            [is_email],
        );

   if(exists.rows.length > 0) {
        throw Error("this email already exists")
     }

   //password hash
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(is_password, salt);

   //create user identifiers
    const user_id = uuidv4();

    // user method in tutorial
   const createUser = await pool.query(
       "INSERT INTO users (user_id, email, password) VALUES ($1, $2, $3) RETURNING *",
       [user_id, is_email, hash]
   );

   return createUser.rows
}

//signup user
const signupUser = async (req, res) => {
    try{
        const {user_code, email, password} = req.body;
        //the user method in the tutorial
        const user = await signUp(email, password)
        res.status(201).json({email, user})
    } catch (error) {
        console.log(error)
        res.json({msg: error.message})
    }
}

//login user
const loginUser = async (req, res) =>{
    res.json({msg: "messae"})
}

module.exports = {
    loginUser,
    signupUser
}