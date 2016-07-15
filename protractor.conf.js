var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var JasmineConsoleReporter = require('jasmine-console-reporter');

exports.config = {
  framework: 'jasmine2',

  capabilities: {
  'browserName': 'phantomjs',

  /*
   * Can be used to specify the phantomjs binary path.
   * This can generally be ommitted if you installed phantomjs globally.
   */
  'phantomjs.binary.path': require('phantomjs').path,

  /*
   * Command line args to pass to ghostdriver, phantomjs's browser driver.
   * See https://github.com/detro/ghostdriver#faq
   */
  'phantomjs.ghostdriver.cli.args': ['--webdriver=4444','--loglevel=DEBUG']
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['test/e2e/*.spec.js'],

  onPrepare: function() {

    //add jasmine html && screenshots reporters
    jasmine.getEnv().addReporter(
       new Jasmine2HtmlReporter({
         savePath: 'logs/e2e/html',
         screenshotsFolder: '-screenshots'
       })
    );

    //add console reporters
    jasmine.getEnv().addReporter(
      new JasmineConsoleReporter({
         colors: 1,           // (0|false)|(1|true)|2
         cleanStack: 1,       // (0|false)|(1|true)|2|3
         verbosity: 4,        // (0|false)|1|2|(3|true)|4
         listStyle: 'indent', // "flat"|"indent"
         activity: false
     })
    );
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true // Use colors in the command line report.
  }

};
