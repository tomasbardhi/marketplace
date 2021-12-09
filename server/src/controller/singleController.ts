import express from "express"
import verifyToken from "../middleware/verifyToken"
import singleService from "../service/singleService"
const router = express.Router()

router.get("/", async (req, res) => {
    const response = await singleService.get(req)
    res.send(response)
})

router.get("/:id", async (req, res) => {
    const response = await singleService.getById(parseInt(req.params.id))
    res.send(response)
})

router.post("/", verifyToken, async (req, res) => {
    const response = await singleService.create(req.body)
    res.send(response)
})

router.put("/:id", verifyToken, async (req, res) => {
    const response = await singleService.update(parseInt(req.params.id), req.body)
    res.send(response)
})

router.delete("/:id", verifyToken, async (req, res) => {
    const response = await singleService.remove(parseInt(req.params.id))
    res.send(response)
})

export default router