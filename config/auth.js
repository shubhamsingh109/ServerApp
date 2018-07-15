/*=========  expose our config directly to our application using module.exports  =============*/
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '116799662362393', 
		'clientSecret' 	: '706f96fa4aa07d6a9e27b41ab5c45815', 
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback',
		'profileFields' :   ['id','displayName','photos','gender','profileUrl','email']
	},

	'twitterAuth' : {
		'consumerKey' 		: 'bQ8exB9Ru9ORIQKn7wDLSuisR',
		'consumerSecret' 	: 'EeuB3vMo7ObSUHNqFes7JLJc8JUAmIfGXlId2WyDGahE28pXng',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID'         : '256423384875-p5ks0183drnhcc9aeo1msv9e7m86ftkh',
		'clientSecret'     : 'FO9_ZCZI3wN0R5Sjbie4dldB',
		'callbackURL'      : 'http://localhost:8080/auth/google/callback'
	}

};