const db=require("../mongo");
const bcrypt=require("bcryptjs");

const services={
    async empaccountcreation(req,res)
    {
        try
        {   //Request body validation
            const count= await db.employeeaccounts.count();
                console.log("count",count);
                    const user=await db.employeeaccounts.findOne({username: req.body.userName});
                    if(user)
                    {
                        return res.status(400).send();
                    }
                    else
                    {

                        const salt=await bcrypt.genSalt(10)
                        req.body.password=await bcrypt.hash(req.body.password,salt);
                        //  inserting new data
                        const empId=`empId${count+3}`;
                        const details={
                            name:req.body.name,
                            username:req.body.userName,
                            password:req.body.password,
                            empId:empId,
                        }
                        await db.employeeaccounts.insertOne(details);
                        console.log("User Registered Successfully");
                        res.send({mes:"User Registered Successfully"})
                    }
        }
        catch(err)
        {
            console.log("Error ",err);
            res.sendStatus(500);
        }
    },
    async leaverequestlist(req,res){
        try{
            await db.leaveRequest.find({status:"pending"}).toArray(function(err, result) {
                if (err) throw err;
                // console.log(result);
                res.send(result);
              });
        }
        catch(err)
        {
            console.log("error",err);
        }
    },
    async leavestatus(req,res){
        try{
            console.log(req.body);
            if(req.body.status=="accepted"){
                await db.leaveRequest.updateOne({empId:req.body.empId, reason:req.body.reason,date:req.body.date},{$set:{status:"accepted"}});
                res.send({msg:"Accepted"});
                console.log("Accepted");
            }
            if(req.body.status=="declined"){
                await db.leaveRequest.updateOne({empId:req.body.empId, reason:req.body.reason,date:req.body.date},{$set:{status:"declined"}});
                console.log("Declined");
                res.send({msg:"Declined"});
            }
        }
        catch(err){
            console.log("error",err)
        }
    },

    async attendancecheck(req,res){
        try{
            console.log(req.body);
            await db.attendance.find({date:req.body.date}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
              });
            
        }
        catch(err){
            console.log(err);
        }
    },
    async employeelist(req,res){
        try{
            await db.employeeaccounts.find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
              });
        }
        catch(err)
        {
            console.log("error",err);
        }
    }
}

module.exports=services;