const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://localhost:27017/firstdb",{ useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true})
.then( () => console.log("connection successful.."))
.catch((err) => console.log(err)) ;


const studentsSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique:true,
        maxlength:30,
        lowercase:true,


        trim: true,

        minlength:[2,"minimum add 2 letter"] 
    },
    type : { String,
        enum : ["react", "backend", "node",]
    },

    countapp : {
        type: Number,
        validate(value){
            if (value < 0){
                throw new Error("add positive values only")
            }
        },
    },
    active : Boolean,
    email :  { 
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    
    },

    date: {
        type:Date,
        default : Date.now
    }



})
const Scholar = new mongoose.model("Scholar",studentsSchema);



const creatDocument = async () => {
    try{
        // const vinScholar = new Scholar({
        //     name : "KEKFFE",
        //     type : "node",
        //     countapp : 6,
        //     active : true,
        
        // })
        // const priyanScholar = new Scholar({
        //     name : "priyan ",
        //     type : "node",
        //     countapp : 6,
        //     active : true,
        
        // })
        // const abhayScholar = new Scholar({
        //     name : "abhay",
        //     type : "react",
        //     countapp : 8,
        //     active : true,
        
        // })
        const tejasScholar = new Scholar({
            name : "Saaaaa",
            type : "backend",
            countapp : 11,
            email : "answ.ijd@ssc",
            active : true,
        
        })
        
        const result = await Scholar.insertMany([tejasScholar]);
        console.log(result);


    }
     catch(err){
        console.log(err);
    }
}

creatDocument();

// const getDocument = async () =>{
//     const result = await Scholar
//     // .find({countapp :{$gte : 4}})
//     .find({$and : [{type:"node"}]})
//     // .find({type : ["backend"]})

//     .select({name:1})
//     console.log(result);


// }
// // getDocument();

// // update document

// const updateDocument = async (_id) => {
//     try{
//         const result = await Scholar.findByIdAndUpdate({_id},{
//             $set : {
//                 name:"Jayesh"
//             } 
//          },{ 
//              new : true,
//              useFindAndModify: false ,
//           } );
//          console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }

// // updateDocument("60c653fa9ddfdf450cca1f49");
