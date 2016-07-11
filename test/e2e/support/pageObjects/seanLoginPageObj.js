var SeanLoginPage = function() {
  var username = element(by.model('username'));
  var password = element(by.model('password'));
  var pageTitle = element(by.id('page-title'));
  var loginButton = element(by.id('login-button'));

  this.get = function() {
    browser.get('http://localhost:8080/login');
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

  this.login = function() {
    return loginButton.click();
  };
};

module.exports = SeanLoginPage;
