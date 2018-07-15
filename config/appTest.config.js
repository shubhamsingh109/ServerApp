export const testConf={
	registerTest:{
		"email":"nishantjaiswal49@gmail.com",
		"contactNo":"123","dob":"12/12/12",
		"password":"$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi",
    	"fullName":"nishant","emailNegative":"nishantjaiswal"
	},

	flagTest:{
		"Email":"nishantjaiswal49@gmail.com",
		"flag":1,
		"cardNo":"123"
	},

	tokenTest:{
		"email":"nishantjaiswal49@gmail.com",
        "password":"$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi" 
      },

    loginTest:{
    	"email":"nishantjaiswal49@gmail.com",
    	"password":"12345"
    },

    loginMessage:{
    	"error":"Authentication failed. Passwords did not match."
    },

    deleteError:{
    	error:"error occured"
    },

    deleteTest:{
    	email:"nish.com",
    	password:"1234"
    },
      
    getCategory:{
    	"categoryId": 2895153,
    	"category": "tax",
    	"email":"nishantjaiswal49@gmail.com"
    },

    forgetTest:{
    	"email":"nishantjawal49@gmail.com",
    	"password":"1234"},

    forgetError:{
    	"email":"nishantjaiswal49@gmail.com",
    	"Message":'Invalid Email id'
    },
    
    setPassword:{
    	"email":"nishantjaiswal49@gmail.com",
    	"password":"$2a$10$GzYKtCErFPW1DSpFDjTd2.DQXKjPwEhPbBuW3lTWZ/qzpJDgHexCi"
    },

    deleteData:{
    	"email":"nishantjaiswal49@gmail.com",
    	"categoryName":"Tax"
    },
    
    addCategory:{
    	"message":"category Name alerady exist"
    },
    
    reset:{
    	"email":"nishantjaiswal49@gmail.com",
    	"password":"123",
    	"NewPassword":"2345"
    },
    
    updateCategory:{
    	"email":"Shilpi123@gmail.com",
    	"budget":2000,
    	"categoryName":"Electronics"
    },
    
    getTransaction:{
        "_id": "59d8a04f8b7659304ab6f1d9",
        "dob": "2012-12-10T18:30:00.000Z",
        "contact": 9487584354,
        "email": "Shilpi123@gmail.com",
        "password": "Gmail@123",
        "fullName": "shipli",
        "category": [
            {
                "_id": "59d8a10ef4ca8331b7fc9041",
                "budget": 4000,
                "categoryName": "tax",
                "categoryId": "520691"
            }
        ],
        "transaction": [
            {
                "_id": "59da1e438686885418bcc5ab",
                "description": "property",
                "expense": 3000,
                "date": "2017-10-12",
                "categoryId": "520691",
                "account_id": "123456789",
                "transaction_id": 294159702
            } 
        ],
        "account": [
            {
                "_id": "59d8a1c815784b31de9cf00a",
                "type": "saving",
                "name": "hdfc bank",
                "balances": 5000,
                "account_id": "123456789"
            }
        ]
    },

    getTransactionNegative:{
    	"negativedob":"2014-12-10T18:30:00.000Z",
    	"negativeContact":"9483343384354"
    },

    deleteTransaction:{
        "ok": 1,
        "nModified": 1,
        "n": 1
    },

    updateTransaction:{
    	"email":"nishantjaiswal49@gmail.com",
    	"date":"2017-10-20",
    	"expense":140,
    	"description":"Hotel"
    },
    
    otpMail:{
    	"email":"abc@abc.com",
    	"subject":"Test Subject",
    	"content": "Test Content"
    },
    
    otpMailMessage:{
    	"message":"Budget Overshootmail sent",
    	"negativeMessage":"Invalid email address"
    },
    
    mail:{
    	"email":"abc@abc.com",
    	"subject":"Test Subject",
    	"content": "Test Content"
    },
    
    mailMessage:{
    	"message":"OTP Sent",
    	"negativeMessage":"OTP not Sent",
    	"boolean":'boolean check returned'
    }

}