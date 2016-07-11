var SeanSignUpPage = function() {
  var firstName = element(by.model('firstName'));
  var lastName = element(by.model('lastName'));
  var username = element(by.model('username'));
  var password = element(by.model('password'));
  var pageTitle = element(by.id('page-title'));
  var registerButton = element(by.id('register-button'));

  this.get = function() {
    browser.get('http://localhost:8080/register');
  };

  this.setFirstName = function(name) {
    firstName.sendKeys(name);
  };

  this.setLastName = function(name) {
    lastName.sendKeys(name);
  };

  this.setUsername = function(name) {
    username.sendKeys(name);
  };

  this.setPassword = function(name) {
    password.sendKeys(name);
  };

  this.getPageTitle = function() {
    return pageTitle.getText();
  };

  this.register = function() {
    return registerButton.click();
  };
};

module.exports = SeanSignUpPage;
