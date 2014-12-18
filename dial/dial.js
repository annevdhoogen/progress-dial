/*

### PROGRESS-DIAL ###

- A responsive circular progress bar, or pie chart, which animates to the value when the page has loaded.
- Created by Anne van den Hoogen http://annevandenhoogen.nl

# EXAMPLES

https://cloud.githubusercontent.com/assets/10232608/5488898/1b6d89e4-86c4-11e4-803f-e321bfe5cab0.png

# USAGE

- Include the CSS and JS files:

<link rel="stylesheet" href="dial/dial.css" />

<script src="dial/dial.js"></script>

- Don't forget to include jQuery as well.

- Create a div with data-attributes:

<div class="dial-example" data-value="89"></div>
<div class="dial-example" data-value="32" data-dial-color="#3F51B5" data-label="400Mb"></div>
<div class="dial-example" data-value="65" data-dial-color="#E91E63" data-dial-background-color="#FFFFFF" data-label-color="#880E4F" data-label-background-color="#F5F5F5" ></div>
<div class="dial-example" data-value="16" data-dial-color="#00BCD4" data-dial-background-color="#E0F2F1" data-label-show="false"></div>

- And make a dial out of it in JS:

$(".dial-example").dial();

# OPTIONS

The default options are:

value: 0
dialColor: "#FFC107"
dialBackgroundColor: "#F5F5F5"
label: null
labelShow: true
labelColor: "#333333"
labelBackgroundColor: "#FFFFFF"

*/

(function($) {
  "use strict";

  $.fn.dial = function(options) {

    var dial;
    var settings;
    
    // Traverse all nodes
    this.each(function() {
      dial = $(this);

      setDialSettings(options);
      checkDialSettings();
      createDialHtml();
      animateDialToGoal();
      
    });
    
    function setDialSettings(){
      
      settings = $.extend({
        // set (default) options
        value: dial.data("value") !== undefined ? dial.data("value") : 0,
        dialColor: dial.data("dial-color") !== undefined ? dial.data("dial-color") : "#FFC107",
        dialBackgroundColor: dial.data("dial-background-color") !== undefined ? dial.data("dial-background-color") : "#F5F5F5",
        label: dial.data("label") !== undefined ? dial.data("label") : null,
        labelShow: dial.data("label-show") !== undefined ? dial.data("label-show") : true,
        labelColor: dial.data("label-color") !== undefined ? dial.data("label-color") : "#333333",
        labelBackgroundColor: dial.data("label-background-color") !== undefined ? dial.data("label-background-color") : "#FFFFFF"
      }, options);
      
    }
    
    function checkDialSettings(){
      // value should not be higher than 100
      if(settings.value > 100){
        settings.value = 100;
      }
    }
    
    function createDialHtml(){
      // creat the correct html for the dial
      // the dialPlugin class makes sure the dial is shown as a cirle
      dial.addClass("dialPlugin");
      
      var htmlCode = "";
      // the bg div is the div that holds all the elements and the background-color
      htmlCode += "<div class='bg' style='background:" + settings.dialBackgroundColor + ";'>";
      // the secondHalf and firstHalf divs are created to show the progress
      // the firstHalf is used to display the first 50%
      // the secondHalf is used to display the remaining percent
      htmlCode += "  <div class='secondHalf' style='background:" + settings.dialBackgroundColor + ";' data-dial-color='" + settings.dialColor+ "'></div>";
      htmlCode += "  <div class='firstHalf' style='background:" + settings.dialColor + ";'></div>";
      
      // if the label is not shown you can create a pie chart
      if( settings.labelShow ){
        // the text-clipper div clips the text in it's container, it also holds a background-color to create the effect of a circular progress bar
        htmlCode += "<div class='text-clipper' style='color:" + settings.labelColor + "; background:" + settings.labelBackgroundColor + ";'>";
        htmlCode += "  <div class='text' >";
        
        // show either the label of the value
        if(settings.label || settings.label === ""){
          htmlCode += "  <span>" + settings.label + "</span>";
        } else {
          htmlCode += "  <span>" + settings.value + "%</span>";
        }
      
        htmlCode += "  </div>";
        htmlCode += "</div>";
      }
      
      htmlCode += "</div>";
      
      dial.html(htmlCode);
      
    }
    
    function animateDialToGoal() {
      
      var secondHalf = dial.find(".secondHalf");
      var degrees = 0;
      var currentPercentage = 0;
      
      // animate the dial to the goal
      // as it starts, both halfs are position at the right of the dial
      // the first half has the wanted backgroundcolor, the second half is on top of it and has the main dial backgroundcolor
      secondHalf.animate(
        {
          // we are using textIndent as our help value to animate to
          textIndent: settings.value
        },
        {
          step: function(now, fx) {
            // the currentPercentage is the progress towards the value
            currentPercentage = Math.ceil(now);            
            
            if (currentPercentage < 50) {
              // while the currentPercentage is beneath 50, get de degrees to turn the secondhalf
              // the secondhalf rotates away from the colored first half to create the effect of progress
              degrees = getDegrees(currentPercentage);         
            } else {
              // if the currentPercentage is higher than 50 the secondHalf has to be "in-use"
              // in the css it gets positioned on the right half again
              // we give it the wanted backgroundcolor so if it again rotateds away from the (colored) first half, it created the effect of progress
              if (!$(this).hasClass("in-use")) {
                $(this)
                  .addClass("in-use")
                  .css("background", $(this).data("dial-color"));
              }
              
              // so now we need the degrees minus 50 to create the same rotation of this half for the first 50%
              degrees = getDegrees(currentPercentage - 50);
              
            }
            
            // set the correct rotation to the second half
            $(this).css('transform', 'rotate(' + degrees + 'deg)');

          },
          // animating to the value takes 500ms
          duration: 500
        }
      );
      
    }
    
    function getDegrees(num) {
      // the rotation goes from -180 to 0 for both halfs
      return ( 180 * num / 50 ) - 180;
      
    }
    
    return this;

  };

}(jQuery));
