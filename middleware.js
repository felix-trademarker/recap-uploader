var axios = require('axios')

// secret: '71e0aba070df4892e7384da1828fbfff',
// name: 'cpod.sid',

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt
    const { userId } = req.session

    console.log("userId",userId)
    console.log("accessToken",req.cookies)

    // let results = axios.get()

    next()
}