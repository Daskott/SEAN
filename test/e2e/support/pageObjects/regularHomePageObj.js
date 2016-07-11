var RegularHomPage = function() {
  var greeting = element(by.id('greeting'));
  var logoutButton = element(by.id('logout-button'));
  var userRole = element(by.id('user-role'));

  this.get = function() {
    browser.get('http://localhost:8080/home');
  };

  this.getUserRole = function() {
    return userRole.getText();
  };

  this.getGreeting = function() {
    return greeting.getText();
  };

  this.logout = function() {
    return logoutButton.click();
  };
};

module.exports = RegularHomPage;
