const passwordReset = async(req)=>{
  try{
    const{email} = req.body;
    
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error: "Invalid email"})
    }
}catch(error){
    res.status(500).json({error: "Error logging in"})
}
}

module.exports = {
  passwordReset,
};