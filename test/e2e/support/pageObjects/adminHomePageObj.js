var AdminHomPage = function() {
  var greeting = element(by.id('admin-greeting'));
  var logoutButton = element(by.id('admin-logout-button'));
  var userRole = element(by.id('admin-role'));

  this.get = function() {
    browser.get('http://localhost:8080/home');
  };

  this.getUserRole = function() {
    return userRole.getText();
  };

  this.getGreeting = function() {
    return greeting.getText();
  };

  this.getDeleteButton = function(buttonId) {
    var deleteButton = element(by.id(buttonId));
    return deleteButton;
  };

  this.delete = function(buttonId) {
    var deleteButton = element(by.id(buttonId));
    return deleteButton.click();
  };

  this.logout = function() {
    return logoutButton.click();
  };
};

module.exports = AdminHomPage;
