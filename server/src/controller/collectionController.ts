import express from "express"
import collectionService from "../service/collectionService"
const router = express.Router()

router.get("/", async (req, res) => {
    const response = await collectionService.get()
    res.send(response.data)
})

router.get("/:id", async (req, res) => {
    const response = await collectionService.getById(parseInt(req.params.id))
    res.send(response.data)
})

router.post("/", async (req, res) => {
    const response = await collectionService.create(req.body)
    res.send(response.data)
})

router.put("/:id", async (req, res) => {
    const response = await collectionService.update(parseInt(req.params.id), req.body)
    res.send(response.data)
})

router.delete("/:id", async (req, res) => {
    const response = await collectionService.remove(parseInt(req.params.id))
    res.send(response.data)
})

export default router