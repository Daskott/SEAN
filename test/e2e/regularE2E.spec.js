/**********************************************
* Page Objects
***********************************************/
var SeanSignUpPage = require(__dirname+'/support/pageObjects/signUpPageObj');
var SeanLoginPage = require(__dirname+'/support/pageObjects/seanLoginPageObj');
var RegularHomPage = require(__dirname+'/support/pageObjects/regularHomePageObj');
var User = require(__dirname+'/support/db/users');

/**********************************************
* Actual tests
***********************************************/
var newUser = {
  firstName:'Julie',
  lastName:'Lanna',
  username:'Mimi',
  password:'password'
}

describe('SEAN.IO: Regular User', function() {

  //register user
  describe('SEAN.IO Registration Page', function() {
    it('should add a new user', function() {
      var seanSignUpPage = new SeanSignUpPage();
      seanSignUpPage.get();
      expect(browser.getTitle()).toEqual('SEAN.IO');
      expect(seanSignUpPage.getPageTitle()).toEqual('Register');

      seanSignUpPage.setFirstName(newUser.firstName);
      seanSignUpPage.setLastName(newUser.lastName);
      seanSignUpPage.setUsername(newUser.username);
      seanSignUpPage.setPassword(newUser.password);

      seanSignUpPage.register().then(function(){
        expect(seanSignUpPage.getPageTitle()).toEqual('Please sign in');
      });
    });
  });

  //login user
  describe('SEAN.IO Login Page', function() {
    it('should login new user', function() {
      var seanLoginPage = new SeanLoginPage();
      var regularHomPage = new RegularHomPage();

      seanLoginPage.get();
      expect(seanLoginPage.getPageTitle()).toEqual('Please sign in');

      seanLoginPage.setUsername(newUser.username);
      seanLoginPage.setPassword(newUser.password);

      seanLoginPage.login().then(function(){
        //go to home page on login
        expect(regularHomPage.getGreeting()).toEqual('Hi '+newUser.username+'!');
      });
    });
  });

  //Regular user homePage [login as Mimi]
  describe('SEAN.IO Home Page', function() {
    it('should be in user\'s homePage', function() {
      var regularHomPage = new RegularHomPage();
      var seanLoginPage = new SeanLoginPage();
      regularHomPage.get();

      expect(regularHomPage.getGreeting()).toEqual('Hi '+newUser.username+'!');
      expect(regularHomPage.getUserRole()).toEqual('Regular User');

      //logout and go to login page
      regularHomPage.logout().then(function(){
        expect(seanLoginPage.getPageTitle()).toEqual('Please sign in');
      });
    });
  });

  afterAll(function() {
    /*
    * delete newUser afterAll all test has been return
    * using 'username' because it's unique
    */
    var userModel = new User();
    userModel.destroy(newUser.username);
  });
});
