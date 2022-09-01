const pool = require("../models/db");
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken")

//create json web token
const createToken = (user_id) => {
    //the secret can be generated with a password generator. it can be anything and
    //it's user generated
    return jwt.sign({user_id}, process.env.SECRET, {expiresIn: "1d"});
}

// signup logic
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



//login logic
const login = async (is_email, is_password) => {
    //validation
    if(!is_email || !is_password) {
        throw Error("Please fill all fields");
    }

    //check if the email in use already exists
    const exists =  await pool.query(
        "SELECT user_id, email, password FROM users where email = $1",
        [is_email],
    );

    if(exists.rows.length === 0) {
        throw Error("This email does not exist")
    }

    //console.log("got user", exists.rows[0].password)
   const  match = await bcrypt.compare(is_password, exists.rows[0].password)
    //console.log("is match ", match)
    if(!match) {
        throw Error("incorrect password!")
    }

    return exists.rows
}

//signup user
const signupUser = async (req, res) => {
    const {user_code, email, password} = req.body;
    try{
        //the user method in the tutorial
        const user = await signUp(email, password)
        //console.log("is user", user[0].user_id)
        //create token
        const token = createToken(user[0].user_id);
        res.status(201).json({email, user, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
}

//login user
const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body
        const user = await login(email, password)
        //console.log("is userz ", user[0].user_id)
        const token = createToken(user[0].user_id);
        //console.log("is tooken", token)
        res.status(200).json({msg: "Successfully logged in!", email, token})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({msg: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}