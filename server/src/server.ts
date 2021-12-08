import express from "express"
import cors from "cors"
import singleController from "./controller/singleController"
import collectionController from "./controller/collectionController"
import creatorController from "./controller/creatorController"
import joinedController from "./controller/joinedController"
import authController from "./controller/authController"
require("dotenv").config()
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/single", singleController)
app.use("/api/v1/collection", collectionController)
app.use("/api/v1/creator", creatorController)
app.use("/api/v1/joined", joinedController)
app.use("/api/v1/auth", authController)

app.listen(port, () => {
    console.log(`Server is up and listening on port: ${port}`)
})