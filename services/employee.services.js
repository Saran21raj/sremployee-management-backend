const db=require("../mongo");
const bcrypt=require("bcrypt");


const services={
    async resetPassword(req,res){
        try
        {
            const user=await db.employeeaccounts.findOne({username: req.body.userName});
            if(user){
                const salt=await bcrypt.genSalt(10)
                req.body.newPassword=await bcrypt.hash(req.body.newPassword,salt);
                await db.employeeaccounts.findOneAndUpdate({ userName:req.body.userName}, { $set: { password: req.body.newPassword} });
                res.send({msg:"Passwords Changed"});
            }
            else{
                res.status(400).send();
            }
        }
        catch(err)
        {
            res.send(err);
        }

    },
    async leaverequest(req,res)
    {
        try
        {
            const details={
                date:req.body.date,
                empId:req.body.empId,
                reason:req.body.reason,
                status:"pending"
            }
            await db.leaveRequest.insertOne(details);
            console.log("updated in leave request");
            res.send({msg:"updated in leave request"})
        }
        catch(err)
        {
            console.log("Error ",err);
            res.sendStatus(400);
        }
    },
    async attendance(req,res){
        try{
            console.log(req.body);
            const att=await db.attendance.findOne({date: req.body.date,empId:req.body.empId});
            if(att){
                console.log("already Updated");
                res.sendStatus(400)
            }
            else{
                await db.attendance.insertOne({date:req.body.date,empId:req.body.empId,loginTime:req.body.loginTime,logoutTime:req.body.logoutTime});
                console.log("Submited");
                res.send({msg:""})

            }
        }
        catch(err){
            console.log(err);
        }
    },
    async attendancelist(req,res){
        try{
            console.log(req.body);
            await db.attendance.find({empId:req.body.empId}).toArray(function(err, result) {
                if (err) throw err;
                // console.log(result);
                res.send(result);
              });
        }
        catch(err){
            console.log(err);
        }
    },
    async oldleaverequests(req,res){
        try{
            console.log(req.body);
            await db.leaveRequest.find({empId:req.body.empId}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
              });
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports=services;