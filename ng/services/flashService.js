var app = angular.module('app');
 app.service('FlashService', function (Flash) {
   /*
   * Have this tag in the html file you would like
   * the flash message displayed.
   *  <flash-message>
   *  </flash-message>
   */

   //Flash argument params used in the functions below
   // First argument (string) is the type of the flash alert.
   // Second argument (string) is the message displays in the flash alert (HTML is ok).
   // Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
   // Fourth argument (object, optional) is the custom class and id to be added for the flash message created.
   // Fifth argument (boolean, optional) is the visibility of close button for this flash.
   // Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.
   var flashSvc = this;

   flashSvc.successAlert = function (alertMessage) {
       var message = '<strong> Well done!</strong>  '+alertMessage;
       var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
   }

  flashSvc.failureAlert = function (alertMessage) {
     var message = '<strong> OOps!</strong>  '+alertMessage;
     var id = Flash.create('danger', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }

});
