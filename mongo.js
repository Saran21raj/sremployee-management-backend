const {MongoClient}=require("mongodb");

const MONGODB_URL=process.env.MONGODB_URL;
const MONGODB_NAME=process.env.MONGODB_DB_NAME;

const client=new MongoClient(MONGODB_URL);

module.exports={
    // All Collections
    db:null,
    //Specific Collections
    admin:null,
    attendance:null,
    employees:null,
    leaveRequest:null,
    async connect(){
        // Connnecting to database
        await client.connect();
        console.log("Connected to Mongo:",MONGODB_URL);

        // Selecting the database
        this.db=client.db(MONGODB_NAME);
        console.log("Selected Database:",MONGODB_NAME);

        //Selecting Specific Collection
        this.admin=this.db.collection("admin");
        this.employeeaccounts=this.db.collection("employeeaccounts");
        this.leaveRequest=this.db.collection("leaveRequest");
        this.attendance=this.db.collection("attendance");
        // this.employees=this.db.collection("employees");
        
    }
}