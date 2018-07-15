   /* ============================  Config file of routes  =================================*/
export const Conf={
	
	login:
	{
		"error":"error occured",
		"notFound":"user not found",
		"secret":"this is secret",
		"authentication":"Authentication failed. Passwords did not match."
	},
	addAccount:
	{
		"alreadyExist":"account already exists"
	},

	addCategory:
	{
		"nameExists":"category Name already exist"
	},
	forget:
	{
		"invalidEmail":"Invalid Email id"
	},
	mailSend:
	{
		"email":"expensemanager1295@gmail.com",
		"password":"Expense@12",
		"invalidEmail":"Invalid email address",
		"budgetOvershoot":"Budget Overshootmail sent"
	},
	register:
	{
		"userExist":"user already exists",
		"exist":"already exist",
		"new":"new user",
		"newUser":"new user registered"
	},
	resetPassword:
	{
		"notExist":"does not exist"
	},
	addTransaction:
	{
		"notExist":"Category and the Account Doesn't exists"
	},
	deleteTransaction:
	{
		"notExistCategory":"Category Doesnot exists"
	},
	upload:
	{
		"internalError":"Some internal problem in data upload",
		"dataUploaded":"Data uploaded successfully",
		"somethingWrong":"Something went wrong. Please Try Again"
	}
}