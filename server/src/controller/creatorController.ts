import express from "express"
import creatorService from "../service/creatorService"
const router = express.Router()

router.get("/", async (req, res) => {
    const response = await creatorService.get()
    res.send(response.data)
})

router.get("/:id", async (req, res) => {
    const response = await creatorService.getById(parseInt(req.params.id))
    res.send(response.data)
})

router.post("/", async (req, res) => {
    const response = await creatorService.create(req.body)
    res.send(response.data)
})

router.put("/:id", async (req, res) => {
    const response = await creatorService.update(parseInt(req.params.id), req.body)
    res.send(response.data)
})

router.delete("/:id", async (req, res) => {
    const response = await creatorService.remove(parseInt(req.params.id))
    res.send(response.data)
})

export default router