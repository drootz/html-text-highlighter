# HTML Text Highlighter

This script highlight keywords in HTML web applications or sites. It was developed and is best used with small to medium size chunk of HTML text content. The highlighted items can then be tabbed through.

This piece of code was initially created in an another project to highlight keywords in AJAX search results. This script does not pretend to be perfect, please contribute if you feel something is wrong.

- [HTML Text Highlighter Demo](http://idannniel.github.io/html-text-highlighter/)


## Quick start

1. Add the **txtHighlighter.js** script in the footer section of your HTML document. *(It needs to run after the DOM is loaded)*
	```html
	<!-- HTML -->

	<script src="path_to_your_file/txtHighlither.js"></script>
	
	
	```    

2. In the header section of **txtHighlighter.js** file, identify the ID selector corresponding to the text content you want to highlight and save.
	```js
	// JS

	var targetID = "target";


	```


3. *Optionally*, you can also add in your markup and identify a custom search field. Identify it’s ID selector in the header section of **txtHighlighter.js**. If not, a default search field will appear on top of the page.

	```html
	<!-- HTML -->

	<input id="custom-search-field" class="custom-search-field" type="text" name="search" placeholder="Custom Search Field" tabindex="1"/>


	```

	```js
	// JS

	var inputID = "search-field";


	```


## Features
* Small to Medium size HTML content text highlighting.
* Instant text highlighting *onkeyup*.
* Tab through the highlighted items.
* No JS libraries dependencies.
* Default search field functionality.

## Contributing
Anyone and everyone is welcome to [contribute](humans.txt).

> **Note**: I know very little about Javascript. I just started to learn it couple weeks ago. I am always looking for constructive feedback learning buddies or opportunities! So far, thanks to [Eloquent JavaScript](http://eloquentjavascript.net) and the [MDN - Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript)