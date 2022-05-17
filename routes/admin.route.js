const route=require("express").Router();

const services=require("../services/admin.services")
    route.post("/resetpassword",services.resetPassword);
    route.post("/accountcreation",services.adminaccountcreation);
    route.get("/adminlist",services.adminlist);
    route.post("/empaccountcreation",services.empaccountcreation);
    route.get("/employeelist",services.employeelist);
    route.get("/leaverequestlist",services.leaverequestlist);
    route.post("/leavestatus",services.leavestatus);
    route.post("/attendancecheck",services.attendancecheck);
    module.exports=route;