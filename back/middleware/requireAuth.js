const jsonToken = require("jsonwebtoken")
const pool = require("../models/db")

const requireAuth = async (req, res, next) => {
    //verify authentication
    //this will destructure the authorization header that contains the authorization token from the
    //front end
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: "authorization required"})
    }

    //split authorization string (that contains the authorization header with the authorization token) and returns the second index in the resulting array
    const  token = authorization.split(" ")[1]

    try {
        //look at .env file to find the secret. it's needed to complete the verification


        /*
        * the request below
        * //const isToken =  jsonToken.verify(token, process.env.SECRET);
        //console.log("token request ", isToken)
        *
        * will return this:
        * token request  {
              user_id: 'b644bccb-af9d-4254-b3e5-b4ec2e4997f5',
              iat: 1662485201,
              exp: 1662571601
        }
        -- remember that user_id was the parameter passed to jwt to create the token
        * */
        const {user_id} = jsonToken.verify(token, process.env.SECRET)

        //req.user is attaching whatever arguments are assigned to it to the req body. since this is a middleware function
        //it will run before the rest of functions in the controllers and will add that piece of code to them, so that the
        //data got by .user will become available in all of them

        req.user = await pool.query(
            "SELECT user_id FROM users where user_id = $1",
            [user_id]
        )
        //console.log("is user ", req.user.rows[0])
        /*
        the request: console.log("is user attached ", req.user)

        will return this:
                * is user attached  Result {
          command: 'SELECT',
          rowCount: 1,
          oid: null,
          rows: [ { user_id: 'b644bccb-af9d-4254-b3e5-b4ec2e4997f5' } ],
          fields: [
            Field {
              name: 'user_id',
              tableID: 16465,
              columnID: 2,
              dataTypeID: 1043,
              dataTypeSize: -1,
              dataTypeModifier: -1,
              format: 'text'
            }
          ],
          _parsers: [ [Function: noParse] ],
          _types: TypeOverrides {
            _types: {
              getTypeParser: [Function: getTypeParser],
              setTypeParser: [Function: setTypeParser],
              arrayParser: [Object],
              builtins: [Object]
            },
            text: {},
            binary: {}
          },
          RowCtor: null,
          rowAsArray: false
        }

        * */
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "not verified"})
    }


}

module.exports = requireAuth;