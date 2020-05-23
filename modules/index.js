module.exports = {
  autenticateUser: require('./user/auth/api'),
  checkAuthentication: require('./user/auth/api'),
  processMessage: require('./process-message/api'),
  logActivity: require('./user/log-activity/api'),
  createNewUser: require('./user/register/api').createNewUser,
  requestUserToRegister: require('./user/register/api').requestUserToRegister,
  verifyIncomingWebhook: require('./verfiy-incoming-webhook/api'),
}