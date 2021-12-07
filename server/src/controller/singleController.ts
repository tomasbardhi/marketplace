import express from "express"
import singleService from "../service/singleService"
const router = express.Router()

router.get("/", async (req, res) => {
    const response = await singleService.get()
    res.send(response.data)
})

router.get("/:id", async (req, res) => {
    const response = await singleService.getById(parseInt(req.params.id))
    res.send(response.data)
})

router.post("/", async (req, res) => {
    const response = await singleService.create(req.body)
    res.send(response.data)
})

router.put("/:id", async (req, res) => {
    const response = await singleService.update(parseInt(req.params.id), req.body)
    res.send(response.data)
})

router.delete("/:id", async (req, res) => {
    const response = await singleService.remove(parseInt(req.params.id))
    res.send(response.data)
})

export default router