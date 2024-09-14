import {Address} from '../models/Address.js'

export const addAddress = async (req, res) => {
     let {fullname, address, city, state, country, pincode, phonenumber} = req.body;
     let userId = req.user
     let userAddress = await Address.create({userId, fullname, address, city, state, country, pincode, phonenumber});

     res.json({message: "Address Added..", userAddress, success:true})
  
}

export const getAddress = async (req, res) => {

     try {
          let address = await Address.findOne({userId: req.user}).sort({createdAt: -1});
          if(!address) return res.status(404).json({message: "Address not found", success: false});
     
          res.json({message: "address", userAddress: address, success:true})
     } catch (error){
          res.json({message: "some error in address", success:false})
     }
} 