const productmodel=require("../model/productmodel")


const createproduct=async (req, res) => {
    const newProduct = new productmodel(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).send(savedProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }


const update=  async (req, res) => {
    try {
      const updatedProduct = await productmodel.findByIdAndUpdate(
       req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const deleteproduct =async (req, res) => {
    try {
      await productmodel.findByIdAndDelete(req.params.id);
      res.status(200).send("Product has been deleted...");
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

 const getdatabyid= async (req, res) => {
    try {
      const product = await productmodel.findById(req.params.id);
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  
 }

 const getProductsbyquary= async function (req, res) {
    try {
      
        let title = req.query
        let products = await productmodel.find(title)
        if(!products)return res.send({msg:"there is no data"})
        return res.status(200).send(products)
    }

    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

  module.exports={createproduct,update,deleteproduct,getdatabyid,getProductsbyquary}