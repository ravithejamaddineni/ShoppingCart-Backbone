define([
  'jquery',
  'underscore',
  'backbone',  
  'text!templates/children/childrenTemplate.html',  
  'collections/children/ChildrenCollection',
], function($, _, Backbone, childrenTemplate, ChildrenCollection){

  var ChildrenView = Backbone.View.extend({
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
        var childrenCollection = new ChildrenCollection(productsData);
      
        var that = this;
        
        $.when( this.updateListItems(selectedValue,childrenCollection) ).then(
              function( childrenCollection ) {
                  var data = {
                        items: childrenCollection.models,
                        _: _ 
                  };
                  var compiledTemplate = _.template( childrenTemplate, data );
                  that.$el.html( compiledTemplate );
                  $('#FilterCriteria').val(selectedValue);
                  
              }
        );
            
      
      
    },
    updateListItems: function(selectedValue, childrenCollection){
        var deferredObject = jQuery.Deferred();
        
            if(selectedValue === 'High to Low'){
                childrenCollection.comparator = function( model ) {
                    return -model.get( 'price' );
                }

                childrenCollection.sort();
            }else if(selectedValue === 'Low to High'){
                childrenCollection.comparator = function( model ) {
                    return model.get( 'price' );
                }

                childrenCollection.sort();
            }else if(selectedValue === 'less than $5'){

               childrenCollection = new ChildrenCollection(childrenCollection.filter(function(model) {
                  return model.get("price") < 5 ;
               })); 
            }else if(selectedValue === '$5 - $10'){
               childrenCollection = new ChildrenCollection(childrenCollection.filter(function(model) {
                  return model.get("price") >=5 && model.get("price") <=10;
               })); 
            }else if(selectedValue === '$10 - $15'){
               childrenCollection = new ChildrenCollection(childrenCollection.filter(function(model) {
                  return model.get("price") >=10 && model.get("price") <=15;
               })); 
            }else if(selectedValue === '$15 - $20'){
               childrenCollection = new ChildrenCollection(childrenCollection.filter(function(model) {
                  return model.get("price") >=15 && model.get("price") <=20;
               })); 
            }else if(selectedValue === 'over $20'){
                childrenCollection = new ChildrenCollection(childrenCollection.filter(function(model) {
                  return model.get("price") >=20;
               })); 
            }
            deferredObject.resolve( childrenCollection );
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

  return ChildrenView;
  
});