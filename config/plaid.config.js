import plaid from 'plaid';

var client = new plaid.Client(
	'59b928e6bdc6a46595e87ab1',               // client_Id
	'48d6cb02b1f767426e224709b2f773',         // secret key
	'0db4a76988169fc8ed287c31fdf94a',         //public key
	plaid.environments['sandbox']
	);

module.exports = {

	client
	
};