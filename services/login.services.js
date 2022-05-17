const db=require("../mongo");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const JWT_KEY=process.env.JWT_SECRET_KEY;

const services={
    async admin(req,res)
    {
        try
        {
            // Checking wheather user exists or not
            const admin=await db.admin.findOne({username: req.body.userName});
            if(!admin){
                return res.status(400).send({error:"User Doesn't Exits"});
            }
            const isValid= req.body.password==admin.password;
            if(!isValid)
                return res.status(403).send({error:"Email & Password Doesnt match"})
                const token=jwt.sign({adminId: admin._id},JWT_KEY);
                const userName=admin.userName;
                res.send({token,userName});
                // console.log("SIGGNEDIN");
        }
        catch(err)
        {
            console.log("Error  Data",err);
            res.sendStatus(500);
        }
    },
    async employee(req,res)
    {
        try
        {
            // Checking wheather user exists or not
            const employee=await db.employeeaccounts.findOne({username: req.body.userName});
            if(!employee){
                return res.status(400).send({error:"User Doesn't Exits"});
            }
            const isValid= await bcrypt.compare(req.body.password,employee.password);
            if(!isValid)
                return res.status(403).send({error:"Email & Password Doesnt match"})

                const token=jwt.sign({employeeId: employee._id},JWT_KEY);
                // console.log(token);
                // const details=jwt.verify(token,process.env.JWT_SECRET_KEY);
                const empId= employee.empId;
                const name=employee.name;
                res.send({token,empId,name});
                console.log("loggedin");
            
        }
        catch(err)
        {
            console.log("Error Inserting Data",err);
            res.sendStatus(500);
        }
    }
}

module.exports=services;