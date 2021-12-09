import express from "express"
import verifyToken from "../middleware/verifyToken"
import collectionService from "../service/collectionService"
const router = express.Router()

router.get("/", async (req, res) => {
    const response = await collectionService.get(req)
    res.send(response)
})

router.get("/:id", async (req, res) => {
    const response = await collectionService.getById(parseInt(req.params.id))
    res.send(response)
})

router.post("/", verifyToken, async (req, res) => {
    const response = await collectionService.create(req.body)
    res.send(response)
})

router.put("/:id", verifyToken, async (req, res) => {
    const response = await collectionService.update(parseInt(req.params.id), req.body)
    res.send(response)
})

router.delete("/:id", verifyToken, async (req, res) => {
    const response = await collectionService.remove(parseInt(req.params.id))
    res.send(response)
})

export default router