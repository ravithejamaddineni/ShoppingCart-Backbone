define([
  'jquery',
  'underscore',
  'backbone',  
  'text!templates/sports/sportsTemplate.html',  
  'collections/sports/SportsCollection',
], function($, _, Backbone, sportsTemplate, SportsCollection){

  var sportsView = Backbone.View.extend({
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
        var sportsCollection = new SportsCollection(productsData);
        
        var that = this;
        
        $.when( this.updateListItems(selectedValue,sportsCollection) ).then(
              function( sportsCollection ) {
                  var data = {
                        items: sportsCollection.models,
                        _: _ 
                  };
                  var compiledTemplate = _.template( sportsTemplate, data );
                  that.$el.html( compiledTemplate );
                  $('#FilterCriteria').val(selectedValue);
                  
              }
        );
            
      
      
    },
    updateListItems: function(selectedValue, sportsCollection){
        var deferredObject = jQuery.Deferred();
        
            if(selectedValue === 'High to Low'){
                sportsCollection.comparator = function( model ) {
                    return -model.get( 'price' );
                }

                sportsCollection.sort();
            }else if(selectedValue === 'Low to High'){
                sportsCollection.comparator = function( model ) {
                    return model.get( 'price' );
                }

                sportsCollection.sort();
            }else if(selectedValue === 'less than $5'){

               sportsCollection = new SportsCollection(sportsCollection.filter(function(model) {
                  return model.get("price") < 5 ;
               })); 
            }else if(selectedValue === '$5 - $10'){
               sportsCollection = new SportsCollection(sportsCollection.filter(function(model) {
                  return model.get("price") >=5 && model.get("price") <=10;
               })); 
            }else if(selectedValue === '$10 - $15'){
               sportsCollection = new SportsCollection(sportsCollection.filter(function(model) {
                  return model.get("price") >=10 && model.get("price") <=15;
               })); 
            }else if(selectedValue === '$15 - $20'){
               sportsCollection = new SportsCollection(sportsCollection.filter(function(model) {
                  return model.get("price") >=15 && model.get("price") <=20;
               })); 
            }else if(selectedValue === 'over $20'){
                sportsCollection = new SportsCollection(sportsCollection.filter(function(model) {
                  return model.get("price") >=20;
               })); 
            }
            deferredObject.resolve( sportsCollection );
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

  return sportsView;
  
});