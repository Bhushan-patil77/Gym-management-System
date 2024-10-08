const mongoose = require('mongoose');
const userModel = require('../models/userModel')


exports.createUser = async (req, res) =>{

    try {

   const newUser = new userModel(req.body);
   console.log(req.body);
   
   const data = await newUser.save();
   res.status(200).json(data)
      
    } catch (error) {

      res.status(500).json({error:'An error occurred while creating user..'})
      
    }



}

exports.getUsers = async (req, res) => {
  try {

    const data = await userModel.find({});
    res.json(data);

  } catch (error) {

    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });

  }
};

exports.deleteUser = async (req, res) => {
  try {

    const data = await userModel.deleteOne({_id:req.body._id});
    console.log(data);
    res.json(data)

  } catch (error) {

    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
    
  }
};

exports.updateUser = async (req, res) => {
  try {


    

    const data = await userModel.updateOne({name:req.body.name}, {$set:{email:req.body.email, name:req.body.name, password:req.body.password}});
    res.json(data)
    
  } catch (error) {

    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
    
  }
};
