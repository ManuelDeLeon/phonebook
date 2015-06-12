goHome = function (client) {
  client
    .url('http://localhost:3000')
    .waitForElementVisible('body', 1000);
  return client;
};

module.exports = {
  'Demo test Google' : function (client) {
    goHome(client)
      .assert.title('Phonebook')

      .end();
  },
  'Demo test Google1' : function (client) {
    goHome(client)
      .assert.title('Phonebook')
      .end();
  }
};