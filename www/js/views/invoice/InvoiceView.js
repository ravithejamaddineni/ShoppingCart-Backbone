define([
  'jquery',
  'underscore',
  'backbone',  
  'text!templates/invoice/invoiceTemplate.html',  
  'collections/cart/CartCollection',
], function($, _, Backbone, invoiceTemplate, CartCollection){

  var invoiceView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      
      
      var cartCollection = new CartCollection(itemsInCart);
     
        
         // To get the Total of all the items in cart
         var getTotal = function(){
                var total = 0;
                for(var i = 0; i < itemsInCart.length; i++){
                    var product = itemsInCart[i];
                    total += (product.price * product.quantity);
                }
                return total;
         }

         //if total price is >= 50$, 10% discount given
         var calculateDiscount = function(){
            var tot = getTotal();
            if(tot >= 50){
                return (tot*10)/100
            }

            return 0; 
         }
         
      var data = {
        items: cartCollection.models,
        totalAmount: getTotal(),
        discountAmount: calculateDiscount(),  
        _: _ 
      };
      var compiledTemplate = _.template( invoiceTemplate, data );
      this.$el.html( compiledTemplate ); 
            
      itemsInCart = [];
      
    }

  });

  return invoiceView;
  
});