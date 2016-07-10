# SEAN
SEAN is a simple project for an easy starting point with [Mysql](https://www.mysql.com/) (using the [Sequelize] (http://docs.sequelizejs.com/en/latest/) ORM), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](https://angularjs.org/) based applications. It is designed to give you a quick and organized way to start developing SEAN based web apps.

## Prerequisite Technologies
### Linux
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started. Recommend node version is node-4.x to run sean.
* *Mysql* - <a href="http://dev.mysql.com/doc/refman/5.7/en/linux-installation.html">Download</a>

If you're using ubuntu, this is the preferred repository to use...

```bash
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get update
$ sudo apt-get install nodejs
```

* *Git* - Get git using a package manager or <a href="http://git-scm.com/downloads">download</a> it.

### Windows
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *Mysql* - Follow the great tutorial from the mongodb site - <a href="http://dev.mysql.com/doc/refman/5.7/en/windows-installation.html">"Install Mysql On Windows"</a>
* *Git* - The easiest way to install git and then run the rest of the commands through the *git bash* application (via command prompt) is by downloading and installing <a href="http://git-scm.com/download/win">Git for Windows</a>

### OSX
* *Node.js* -  <a href="http://nodejs.org/download/">Download</a> and Install Node.js or use the packages within brew or macports.
* *Msql* - Follow the tutorial here - <a href="https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html">Install mysql on OSX</a>
* *git* - Get git <a href="http://git-scm.com/download/mac">from here</a>.

## Prerequisite packages

* Sean currently uses gulp as a build tool and bower to manage frontend packages.
```
$ npm install -g gulp
// and bower
$ npm install -g bower
```
* Create a DB with the name "SEAN"
```
$ mysql> create database SEAN;
```
* In the ./SEAN dir from terminal run: 
```
$ npm install
```
* In the ./SEAN dir, create a ".env" file with the following values:
```
  API_SECRET = "Anything you want"
```
* In the ./SEAN dir, create this file "/config/config.json" with the following values (fill in your mysql password):
```
{
  "development": {
    "username": "root",
    "password": "",
    "database": "SEAN",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "SEAN",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "root",
    "password": "",
    "database": "SEAN",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```
## Start web server

* To start your web server, from terminal run:
```
$ gulp
```
* Access the web app on your localhost:
```
http://localhost:8080/
```
* To make user admin: Form ./SEAN dir in terminal
```
$ gulp user --admin <username>
```
