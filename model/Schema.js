/*===================== load all the things we need ========================================*/
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
mongoose.set('debug',true);
/*=======================  Defining the schema  =============================================*/
let schemaRegister= mongoose.Schema;
/*=======================  schema for register =============================================*/
let Info=new schemaRegister({
	fullName:{type:String},
	email:{type:String,unique:true},
	password:{type:String},
	contact:{type:Number},
	dob:{ type: Date},
	/*=======================  schema for account =============================================*/
	account:[{
		account_id:{ type:String,default:'0'},
		balances:{type:Number},
		name:{type:String},
		type:{type:String},
		flag:{type:Boolean},
		institution_name:{type:String}
	}],
/*=======================  schema for transaction =============================================*/
	transaction:[{
		transaction_id:{ type:Number},
		account_id:{ type:String},
		categoryId:{ type:String},
		date:{ type:String},
		expense:{ type:Number},
		description:{ type:String }
	}],
/*=======================  schema for category =============================================*/
	category:[{
		categoryId:{ type:String},
		categoryName:{ type:String},
		budget:{ type:Number},
		spending:{ type:Number}
	}]
},{collection:"expenseCollection", versionKey:false});

Info.pre('save', function (next) {  
	let user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt,null, function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});
module.exports=mongoose.model('ExpenseSchema',Info);