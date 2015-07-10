define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var SportsModel = Backbone.Model.extend({idAttribute: "id"});

  return SportsModel;

});