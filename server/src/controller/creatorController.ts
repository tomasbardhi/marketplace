import express from "express"
import verifyToken from "../middleware/verifyToken"
import creatorService from "../service/creatorService"
import Creator from "../models/creatorModel"
const router = express.Router()

router.get("/", async (req, res) => {
    const response = await creatorService.get(req)
    res.send(response)
})

router.get("/:id", async (req, res) => {
    const response = await creatorService.getById(parseInt(req.params.id))
    res.send(response)
})

/*
router.post("/", async (req, res) => {
    const response = await creatorService.create(req.body)
    res.send(response)
})

router.put("/:id", async (req, res) => {
    const response = await creatorService.update(parseInt(req.params.id), req.body)
    res.send(response)
})
*/

router.delete("/:id", verifyToken, async (req, res) => {
    const response = await creatorService.remove(parseInt(req.params.id))
    res.send(response)
})

export default router