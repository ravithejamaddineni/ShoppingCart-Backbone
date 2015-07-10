define([
  'jquery',
  'underscore',
  'backbone',  
  'text!templates/women/womenTemplate.html',  
  'collections/women/WomenCollection',
], function($, _, Backbone, womenTemplate, WomenCollection){

  var womenView = Backbone.View.extend({
    el: $("#page"),
    initialize: function() {
      _.bindAll(this, 'cleanup');
    },  
    events: {
        'change #FilterCriteria': 'filterUpdated',
    },
    render: function(productsData, selectedValue){
      
        $('.menu li').removeClass('active');
        $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
        var womenCollection = new WomenCollection(productsData);
      
        var that = this;
        
        $.when( this.updateListItems(selectedValue,womenCollection) ).then(
              function( womenCollection ) {
                  var data = {
                        items: womenCollection.models,
                        _: _ 
                  };
                  var compiledTemplate = _.template( womenTemplate, data );
                  that.$el.html( compiledTemplate );
                  $('#FilterCriteria').val(selectedValue);
              }
        );
      
      
    },
    updateListItems: function(selectedValue, womenCollection){
        var deferredObject = jQuery.Deferred();
        
            if(selectedValue === 'High to Low'){
                womenCollection.comparator = function( model ) {
                    return -model.get( 'price' );
                }

                womenCollection.sort();
            }else if(selectedValue === 'Low to High'){
                womenCollection.comparator = function( model ) {
                    return model.get( 'price' );
                }

                womenCollection.sort();
            }else if(selectedValue === 'less than $5'){

               womenCollection = new WomenCollection(womenCollection.filter(function(model) {
                  return model.get("price") < 5 ;
               })); 
            }else if(selectedValue === '$5 - $10'){
               womenCollection = new WomenCollection(womenCollection.filter(function(model) {
                  return model.get("price") >=5 && model.get("price") <=10;
               })); 
            }else if(selectedValue === '$10 - $15'){
               womenCollection = new WomenCollection(womenCollection.filter(function(model) {
                  return model.get("price") >=10 && model.get("price") <=15;
               })); 
            }else if(selectedValue === '$15 - $20'){
               womenCollection = new WomenCollection(womenCollection.filter(function(model) {
                  return model.get("price") >=15 && model.get("price") <=20;
               })); 
            }else if(selectedValue === 'over $20'){
                womenCollection = new WomenCollection(womenCollection.filter(function(model) {
                  return model.get("price") >=20;
               })); 
            }
            deferredObject.resolve( womenCollection );
       return deferredObject.promise();
    },
    filterUpdated: function(){
        var selectedValue = $('#FilterCriteria').val()
        this.render(productsData,selectedValue);
                    
    },
    cleanup: function() {
        this.undelegateEvents();
        $(this.el).empty();
    }

  });

  return womenView;
  
});