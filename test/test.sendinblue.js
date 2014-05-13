var auth         = require('./auth.json')
  , facade       = require('segmentio-facade')
  , helpers      = require('./helpers')
  , integrations = require('..')
  , should       = require('should')
  , sendinblue    = new integrations['SendinBlue']()
  , settings     = auth['SendinBlue'];

describe('SendinBlue', function() {

 describe('.enabled()', function () {

    it('should be enabled for all channels', function () {
      sendinblue.enabled(new facade.Identify({
        channel: 'server',
        userId: 'test@email.com'
      })).should.be.ok;
      sendinblue.enabled(new facade.Identify({
        channel: 'client',
        userId: 'test@email.com'
      })).should.be.ok;
    });

    it('should only be enabled for messages with `email`', function () {
      sendinblue.enabled(new facade.Identify({
        sessionId: 'session',
        channel: 'server'
      })).should.not.be.ok;

      sendinblue.enabled(new facade.Identify({
        userId: 'test@email.com',
        channel: 'server'
      })).should.be.ok;

    });
  });

describe('.validate()', function () {

    it('should require an accessKey and secretkey', function () {
      sendinblue.validate({}, { listId : 'xxx' }).should.be.an.instanceOf(Error);
      sendinblue.validate({}, { listId : 'xxx', accessKey : '', secretKey : '' }).should.be.an.instanceOf(Error);
    });

    it('should require a listId', function () {
      sendinblue.validate({}, { accessKey : 'xxx', secretKey: 'xxx' }).should.be.an.instanceOf(Error);
      sendinblue.validate({}, { listId : '', accessKey : 'xxx', secretKey : 'xxx' }).should.be.an.instanceOf(Error);
    });

    it('should validate with the required settings and email address', function () {
      should.not.exist(sendinblue.validate({ userId : 'test@email.com' }, { listId : 'xxx', accessKey : 'xxx', secretKey : 'xxx' }));
    });
  });

  describe('.identify()', function () {

    it('should get a good response from the API', function (done) {
      var identify = helpers.identify();
      sendinblue.identify(identify, settings, done);
    });

    it('will error on an invalid set of keys', function (done) {
      var identify = helpers.identify();
      sendinblue.identify(identify, { accessKey : 'x', listId : 'x', secretKey : 'x' }, function (err) {
        should.exist(err);
        done();
      });
    });
    
  });
  
  });
  

