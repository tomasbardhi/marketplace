import express from "express"
import authService from "../service/authService"
const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const response = await authService.register(req.body)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const response = await authService.login(req.body)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

export default router