this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["inv"] = this["Handlebars"]["inv"] || {};

this["Handlebars"]["inv"]["body"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"well well-large\">\r\n    <h1>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n    <article>\r\n    <p>\r\n        Fleet is a demo / playground application designed to highlight a number of technologies.  For more information, see Fleet on github: <a href=\"https://github.com/johndmathis/fleet\" target=\"_blank\">github.com/johndmathis/fleet</a> \r\n    </p>\r\n    <p>\r\n        <h2>What's interesting about this, so far?</h2>\r\n        <ul>\r\n            <li>RequireJs is used to load the entire application.</li>\r\n            <li>The header, this body, and footer sections are all defined in a Marionette module, called 'inventory'.</li>\r\n            <li>The inventory module definition utilizes multiple files, which are all loaded by RequireJS.</li>\r\n            <li>The templates are in separate files as well, and are loaded asynchronously once the inventory module is ready.</li>\r\n        </ul>    \r\n    </p>\r\n    </article>\r\n</div>";
  return buffer;
  });