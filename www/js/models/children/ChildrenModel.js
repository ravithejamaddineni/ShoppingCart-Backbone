define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var ChildrenModel = Backbone.Model.extend({idAttribute: "id"});

  return ChildrenModel;

});