import log4js from 'log4js'; // importing the npm package from logging purpose of server files

log4js.configure({
  appenders: { expense_server_express: { type: 'file', filename: 'expense_server_express.log' }  },
  categories: { default: { appenders: ['expense_server_express'], level: 'info' } }
});

const logger=log4js.getLogger('expense_server_express');
logger.info('LOGGING WORKING PROPERLY');

export default logger;