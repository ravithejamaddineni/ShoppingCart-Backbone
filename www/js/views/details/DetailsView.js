define([
  'jquery',
  'underscore',
  'backbone',  
  'text!templates/details/detailsTemplate.html',  
  'models/cart/CartModel',
  'collections/cart/CartCollection',
], function($, _, Backbone, detailsTemplate, CartModel, CartCollection){
    
  var item;
  
  var DetailsView = Backbone.View.extend({
    el: $("#page"),
    initialize: function() {
      _.bindAll(this, 'cleanup');
    },  
    events: {
        'change #quantityField': 'updateTotal',
        'click #addCart': 'addToCart'
    },
    updateTotal: function (ev) {
        
        var calculateTotal = function(quantity,price){
            item.quantity = quantity;
            var result;
            return (isNaN(result = parseInt(quantity)*parseInt(price))?0:result).toFixed(2);
        };
        
        $(ev.currentTarget).parent().find('#total').html('$'+calculateTotal($(ev.currentTarget).val(),
                                                                        $(ev.currentTarget).parent().find('#realPrice').val()));
         return false;
        
    },
    addToCart: function(){
        itemsInCart.push(item);
        $('#checkoutButton').show();
        //app_router.navigate('', {trigger:true});
        window.history.back();
        //alert(JSON.stringify(itemsInCart));
        return false;
    },
    render: function(productsData, itemID){
      
     
      var totalItems = new CartCollection(productsData);
      
          
      var data = {
        item: totalItems.get(itemID.id),
        _: _ 
      };
      item = data.item.toJSON();
       
      item.quantity = "1";
      var compiledTemplate = _.template( detailsTemplate, data );
      this.$el.html( compiledTemplate ); 
            
      
      
    },
    cleanup: function() {
        this.undelegateEvents();
        $(this.el).empty();
    }  

  });

  return DetailsView;
  
});