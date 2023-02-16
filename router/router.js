const express = require('express');
const router = express.Router()

const{CreateUser,login}=require("../controller/usercontroller")
const{createproduct,update,deleteproduct,getdatabyid} =require("../controller/productcontroller")
const {createwishlist}=require("../controller/whistlist")
const{authentication,authorization1}=require("../middleware/auth")


router.post("/usercreate",CreateUser)
router.post("/logincreate",login)



router.post("/createproduct",createproduct)
router.put("/updateproduct/:id",update)
router.delete("/deleteproduct/:id",deleteproduct)
router.get("/getdatabyid/:id",getdatabyid)
router.get("/getProducts",getdatabyid)

router.post("/createcard/:userId",authentication,authorization1,createwishlist)



module.exports = router;