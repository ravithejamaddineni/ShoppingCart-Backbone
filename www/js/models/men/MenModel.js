define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var MenModel = Backbone.Model.extend({idAttribute: "id"});

  return MenModel;

});