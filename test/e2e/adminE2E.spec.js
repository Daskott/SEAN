/**********************************************
* Page Objects
***********************************************/
'use strict'

var SeanSignUpPage = require(__dirname+'/support/pageObjects/signUpPageObj');
var SeanLoginPage = require(__dirname+'/support/pageObjects/seanLoginPageObj');
var AdminHomPage = require(__dirname+'/support/pageObjects/adminHomePageObj');
var User = require(__dirname+'/support/db/users');

/**********************************************
* Actual tests
***********************************************/
var newUser = {
  firstName:'Sterling',
  lastName:'Archer',
  username:'Malori',
  password:'password'
};

var dummyUser = {
  firstName:'William',
  lastName:'Richard',
  username:'Woodhouse',
  password:'password'
}
;
describe('SEAN.IO: Administrator', function() {

  //register user
  describe('SEAN.IO Registration Page', function() {
    it('should add a new user [Admin]', function() {
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

    it('should add a new user [RegularUser]', function() {
      var seanSignUpPage = new SeanSignUpPage();
      seanSignUpPage.get();
      expect(seanSignUpPage.getPageTitle()).toEqual('Register');

      seanSignUpPage.setFirstName(dummyUser.firstName);
      seanSignUpPage.setLastName(dummyUser.lastName);
      seanSignUpPage.setUsername(dummyUser.username);
      seanSignUpPage.setPassword(dummyUser.password);

      seanSignUpPage.register().then(function(){
        expect(seanSignUpPage.getPageTitle()).toEqual('Please sign in');
      });
    });

    //make newUser 'admin' after all specs
    afterAll(function() {
      var userModel = new User();
      userModel.makeUserAdmin(newUser.username);
    });
  });

  //login as admin
  describe('SEAN.IO Login Page', function() {

    it('should login as admin', function() {
      var seanLoginPage = new SeanLoginPage();
      var adminHomPage = new AdminHomPage();

      seanLoginPage.get();
      expect(seanLoginPage.getPageTitle()).toEqual('Please sign in');

      seanLoginPage.setUsername(newUser.username);
      seanLoginPage.setPassword(newUser.password);

      seanLoginPage.login().then(function(){
        //go to home page on login
        expect(adminHomPage.getGreeting()).toEqual('Hi '+newUser.username+'!');
      });
    });
  });

  //Admin user homePage [login as 'Sterling']
  describe('SEAN.IO Home Page', function() {
    it('should be in admin\'s homePage', function() {
      var adminHomPage = new AdminHomPage();
      var seanLoginPage = new SeanLoginPage();
      adminHomPage.get();
      expect(adminHomPage.getGreeting()).toEqual('Hi '+newUser.username+'!');
      expect(adminHomPage.getUserRole()).toEqual('Administrator');

    });

    it('should be able to delete a user account', function() {
      var adminHomPage = new AdminHomPage();
      var seanLoginPage = new SeanLoginPage();
      adminHomPage.get();

      //check that delete button exist
      expect(adminHomPage.getDeleteButton(dummyUser.username+"_delete").isPresent()).toBe(true);

      // //delete dummyUser
      adminHomPage.delete(dummyUser.username+"_delete").then(function(){
        //refresh page & check that dummyUser is gone
        adminHomPage.get();
        expect(adminHomPage.getDeleteButton(dummyUser.username+"_delete").isPresent()).toBe(false);

        //logout and go to login page
        adminHomPage.logout().then(function(){
          expect(seanLoginPage.getPageTitle()).toEqual('Please sign in');
        });
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
