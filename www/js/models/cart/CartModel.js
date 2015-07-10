define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var CartModel = Backbone.Model.extend({idAttribute: "id"});

  return CartModel;

});