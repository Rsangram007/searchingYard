const { uploadFile } = require("../AWS/aws");
const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//USER REGISTER

const CreateUser = async function (req, res) {
  try {
    let data = req.body;
    let file = req.files;

    if (file && file.length > 0) {
      let productImg = await uploadFile(file[0]);
      data.profileImage = productImg;
    }
    data.password = await bcrypt.hash(data.password, 10);
    let SaveData = await usermodel.create(data);
    return res.status(201).send({ data: SaveData });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

//LOGIN

const login = async (req, res) => {
  try {
    let  email   = req.body;
    const verifyuser = await usermodel.findOne({
      email: email,
    });

    let checkpassword = await bcrypt.compare(req.body.password, verifyuser.password);
    if (!checkpassword)
      return res.status(400).send({
        status: false,
        message: "login failed this password not matches with email",
      });

    const accessToken = jwt.sign(
      {
        id: verifyuser._id,
      },
      "mnfdehfkjdsk",
      { expiresIn: "3d" }
    );

    const { password, ...others } = verifyuser._doc;
    res.status(200).send({ ...others, accessToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { CreateUser, login };
