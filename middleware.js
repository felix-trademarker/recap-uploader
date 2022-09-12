// var axios = require('axios')
// var jwt = require('jsonwebtoken')

// secret: '71e0aba070df4892e7384da1828fbfff',
// name: 'cpod.sid',

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt
    const { userId } = req.session

    console.log("userId",userId)
    console.log("accessToken",req.cookies['cpod.sid'])

    // if (!req.cookies['cpod.sid']) {
    //     res.redirect('/login')
    // } else {
        
    // }

    next()
}



// module.exports = {
//   sign: function (payload) {
//     return jwt.sign(
//       {
//         data: payload,
//       },
//       '71e0aba070df4892e7384da1828fbfff',
//       { expiresIn: '1d' }
//     )
//   },
//   verifyToken: function (token, callback) {
//     jwt.verify(token, '71e0aba070df4892e7384da1828fbfff', callback)
//   },

// }