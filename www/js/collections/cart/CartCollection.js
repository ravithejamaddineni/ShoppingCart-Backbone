define([
  'jquery',
  'underscore',
  'backbone',
  'models/cart/CartModel'
], function($, _, Backbone, CartModel){
  var CartCollection = Backbone.Collection.extend({
    model: CartModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return CartCollection;
});
