

exports.verify = function(req, res, next){
    let accessToken = req.cookies.jwt
    const { userId } = req.session

    console.log("userId",userId)
    console.log("accessToken",accessToken)
}