# progress-dial
A responsive circular progress bar, or pie chart, which animates to the value when the page has loaded.

### Examples
![](https://cloud.githubusercontent.com/assets/10232608/5488898/1b6d89e4-86c4-11e4-803f-e321bfe5cab0.png)

### Usage
Include the CSS and JS files:
```
<link rel="stylesheet" href="dial/dial.css" />
```
```
<script src="dial/dial.js"></script>
```

Don't forget to include jQuery as well.

Create a div with data-attributes:
```
<div class="dial-example" data-value="89"></div>
<div class="dial-example" data-value="32" data-dial-color="#3F51B5" data-label="400Mb"></div>
<div class="dial-example" data-value="65" data-dial-color="#E91E63" data-dial-background-color="#FFFFFF" data-label-color="#880E4F" data-label-background-color="#F5F5F5" ></div>
<div class="dial-example" data-value="16" data-dial-color="#00BCD4" data-dial-background-color="#E0F2F1" data-label-show="false"></div>
```

And make a dial out of it in JS:
```
$(".dial-example").dial();
```
### Options
The default options are:
```
value: 0
dialColor: "#FFC107"
dialBackgroundColor: "#F5F5F5"
label: null
labelShow: true
labelColor: "#333333"
labelBackgroundColor: "#FFFFFF"
```

=============
Created by Anne van den Hoogen http://annevandenhoogen.nl
