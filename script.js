$(document).ready(function() {
  Dials.init();
});

var Dials = (function() {
  "use strict";

  var self = {},
    $dials = $(".dial-example");

  self.init = function() {

    $dials.dial();    

  }

  return self;

})();
