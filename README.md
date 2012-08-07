domy.js
=======================================
Slim DOM-helper JavaScript library for modern browsers. Domy.js mirrors most of jQuery's core methods, except it does not support legacy web browsers.

Why?
----
This library was created while developing extensions for Google Chrome, where you do not need all features jQuery offers, like the wide cross-browser support it has. Domy.js only have the most basic utilities and use the latest DOM API to keep the code small.

Support
-------
Latest version of the browsers below are supported.

- Google Chrome
- Firefox
- Opera
- Safari


Credit
-------
Inspiration came from these libraries:

jQuery  
http://jquery.com/

Light - by freelancephp.net  
http://snipplr.com/view/29083/light-4kb-minijquery/

Current set of methods
---

- `Domy.ready()`
- `Domy.ajax()`
- `Domy.post()`
- `Domy.get()`
- `Domy.getJSON()`
- `$('body > div').`
	- `get()`
	- `size()`
	- `bind()`
	- `click()`
	- `each()`
	- `prop()`
	- `attr()`
	- `removeAttr()`
	- `css()`
	- `addClass()`
	- `removeClass()`
	- `hasClass()`
	- `remove()`
	- `html()`
	- `text()`
	- `val()`



