define([
  'jquery',
  'underscore',
  'backbone',  
  'text!templates/men/menTemplate.html',  
  'collections/men/MenCollection',
], function($, _, Backbone, menTemplate, MenCollection){

  var menView = Backbone.View.extend({
    el: $("#page"),
    initialize: function() {
      _.bindAll(this, 'cleanup');
    },  
    events: {
        'change #FilterCriteria': 'filterUpdated',
    },
    render: function(productsData, selectedValue){
      
        $('.menu li').removeClass('active');
        $('.menu li a[href="#"]').parent().addClass('active');
        var menCollection = new MenCollection(productsData);
      
        
        
        var that = this;
        
        $.when( this.updateListItems(selectedValue,menCollection) ).then(
              function( menCollection ) {
                  var data = {
                        items: menCollection.models,
                        _: _ 
                  };
                  var compiledTemplate = _.template( menTemplate, data );
                  that.$el.html( compiledTemplate );
                  $('#FilterCriteria').val(selectedValue);
                  
                  
                  
              }
        );
            
        
    },
    updateListItems: function(selectedValue, menCollection){
        var deferredObject = jQuery.Deferred();
        
            if(selectedValue === 'High to Low'){
                menCollection.comparator = function( model ) {
                    return -model.get( 'price' );
                }

                menCollection.sort();
            }else if(selectedValue === 'Low to High'){
                menCollection.comparator = function( model ) {
                    return model.get( 'price' );
                }

                menCollection.sort();
            }else if(selectedValue === 'less than $5'){

               menCollection = new MenCollection(menCollection.filter(function(model) {
                  return model.get("price") < 5 ;
               })); 
            }else if(selectedValue === '$5 - $10'){
               menCollection = new MenCollection(menCollection.filter(function(model) {
                  return model.get("price") >=5 && model.get("price") <=10;
               })); 
            }else if(selectedValue === '$10 - $15'){
               menCollection = new MenCollection(menCollection.filter(function(model) {
                  return model.get("price") >=10 && model.get("price") <=15;
               })); 
            }else if(selectedValue === '$15 - $20'){
               menCollection = new MenCollection(menCollection.filter(function(model) {
                  return model.get("price") >=15 && model.get("price") <=20;
               })); 
            }else if(selectedValue === 'over $20'){
                menCollection = new MenCollection(menCollection.filter(function(model) {
                  return model.get("price") >=20;
               })); 
            }
            deferredObject.resolve( menCollection );
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

  return menView;
  
});