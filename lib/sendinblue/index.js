// Include mailin
require("./mailin.js");


/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var object = require('obj-case');
var extend = require('extend');
var is = require('is');

/**
 * Expose `SendinBlue`
 */

var SendinBlue = module.exports = integration('SendinBlue')
  .retries(2);


/**
 * Enabled.
 *
 * @param {Facade} message
 * @param {Object} settings
 * @return {Boolean}
 * @api public
 */

SendinBlue.prototype.enabled = function(message){
  return !! (message.enabled(this.name)
    && message.email
    && message.email());
};

/**
 * Validate.
 *
 * @param {Facade} message
 * @param {Object} settings
 * @return {Error}
 * @api public
 */

SendinBlue.prototype.validate = function(message, settings){
  return this.ensure(settings.accessKey, 'accessKey')
    || this.ensure(settings.listId, 'listId')
    || this.ensure(settings.secretKey, 'secretKey');
};


SendinBlue.prototype.identify = function(identify, settings, callback){
  // Settings
  var id = settings.listId;
  
  // Add the email
  var email = [];
  email.push(identify.email());


	// Initialize mailin object
	var client = new Mailin("https://api.sendinblue.com/v1.0",settings.apiKey,settings.secretKey);

	client.add_users_list(id,email);

}




