const prompt = require('prompt')

prompt.start();

//
// Get two properties from the user: username and password
//
prompt.get([{
    name: 'username',
    required: true
  }, {
    name: 'password',
    hidden: true,
    conform: function (value) {
      return true;
    }
  }], function (err, result) {
  //
  // Log the results.
  //
  console.log('Command-line input received:');
  console.log('  username: ' + result.username);
  console.log('  password: ' + result.password);
});
