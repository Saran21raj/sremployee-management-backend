const route=require("express").Router();

const services=require("../services/login.services")
    route.post("/admin",services.admin);
    route.post("/employee",services.employee);
    module.exports=route;