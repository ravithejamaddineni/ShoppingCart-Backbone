define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var WomenModel = Backbone.Model.extend({idAttribute: "id"});

  return WomenModel;

});