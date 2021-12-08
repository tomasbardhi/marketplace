const jwt = require("jsonwebtoken")

const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.send({
                status: "failed",
                message: "could not verify token",
            })
        }
        req.user = user
        next()
    })
}

export default verifyToken