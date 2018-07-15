/*===================== load all the files we need ========================================*/
let express = require('express'); 
let router = express.Router(); 
let bodyParser = require('body-parser');
let multer = require('multer');
let Schema = require('../../model/Schema');
let xlsxj = require("xlsx-to-json-lc");
import *  as config from  '../../config/app.config';

   /** API path that will upload the files */
module.exports = function(req, res) {
  //console.log("this is",config.Conf.upload.dataUploaded )
  console.log("hello from the other side");
  let userId = "";
  let fileName = "";

  userId = req.params.emailId;

  let storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
     cb(null, './uploads/');
    },
    filename: function (req, file, cb) {  
      fileName = file.originalname;
      let datetimestamp = Date.now();
      cb(null, file.fieldname + '-'+ userId + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });

    let upload = multer({ //multer settings
      storage: storage,
      fileFilter : function(req, file, callback) { //file filter
      if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
        return callback(new Error("Wrong extension type"));
      }
        callback(null, true);
      }
  }).single('file');

  upload(req,res,function(err){
    if(err)
      {
        res.json({error_code:1,err_desc:err, message:config.Conf.upload.internalError});
      }else {
       
        //res.json({error_code:0,err_desc:null, message:config.Conf.upload.dataUploaded, filename : fileName});
      }
  });// end of upload function

// This will read the excel file selectes by the user
xlsxj({
  input: './uploads/file-' + req.params.emailId + '.xlsx',
  output: null, //since we don't need output.json
  lowerCaseHeaders:true
  },
  function(err,result){
    if(err){
      return res.json({userInsert:err});
    } else {
      let flag = -1;
      var messageData =[];

      result.map(function(key){
          if(userId.trim() === userId) {
           
           // will find the desired user
            Schema.find({"email":userId,
              "category":{$elemMatch:{categoryName:key.expense_category}}
              }, 
              (err,result)=>{
               console.log(key.expense_category);
                if(result.length===0){
                  // this will generate a random category id
                  let newCategoryId = parseInt(Math.random()*10000000);
                 
                 //add or update the category and the transactions 
                  Schema.update({"email":userId},
                    {$addToSet:{
                      "category":{"categoryId":newCategoryId,"categoryName":key.expense_category}, 
                      "transaction":{"categoryId":newCategoryId,"date":key.expense_date, "expense":key.expense, "description":key.expense_description}
                    }},
                    {strict:false},(err,result)=>{
                      if(err){
                        res.send(err);
                      }
                      
                    });                
              } else if(!err) {
                let existingCategoryId;
                Schema.find({"email":userId,
                  "category":{$elemMatch:{categoryName:key.expense_category}}
                }, (err, result)=> {
                  
                  if(!err && result.length !==0) {
                   
                    for(let i of result[0].category){
                   
                      if(i.categoryName === key.expense_category) {
                        
                        existingCategoryId = i.categoryId;
                        let rand = Math.floor(Math.random() * 1000000000);
                        console.log("$$$$$$$$$",rand);
                        Schema.update({"email":userId},
                          {$addToSet:{
                            "transaction":{"transaction_id":rand,"categoryId":existingCategoryId,"date":key.expense_date, "expense":key.expense, "description":key.expense_description}
                          }},
                          {strict:false},(err,result)=>{
                            if(err){
                              res.send(err);
                          }
                        });  
                      }
                    }     
                  }
                })
              } else {
                res.status(404).json({
                  success : false,
                  message : err 
                });
              }
            });
          }
      }); 
      if(!err){     
        res.json({error_code:0,err_desc:null, message:config.Conf.upload.dataUploaded, filename : fileName});
      } else {
        res.json({error_code:1,err_desc:null, message:config.Conf.upload.somethingWrong, filename : fileName});
      }
    }
  }
);
}