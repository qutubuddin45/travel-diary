

export  const signUp = async (req,res)=>{
    const{name,email,password} = req.body;

    if(!name || !email || !password || name==="" || email==="" || password===""){
        return res.status(400).json({message : "All fields are required"});
    }

    const hasedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password : hasedPassword,
    })

    try{
        await newUser.save();
        res.json({message : "User created successfully"});

    }catch(error){
        res.status(500).json({message : "something went wrong"});
    }                  

}  