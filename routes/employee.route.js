const route=require("express").Router();

const services=require("../services/employee.services")
    route.post("/leaverequest",services.leaverequest);
    route.post("/attendance",services.attendance);
    route.post("/attendancelist",services.attendancelist);
    route.post("/oldleaverequests",services.oldleaverequests);
    route.post("/resetpassword",services.resetPassword);
    module.exports=route;