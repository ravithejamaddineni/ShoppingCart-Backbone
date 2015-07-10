    // Filename: router.js
    define([
      'jquery',
      'underscore',
      'backbone',      
      'views/footer/FooterView',
      'views/men/MensView',
      'views/sports/SportsView',
      'views/women/WomenView',
      'views/children/ChildrenView',
      'views/details/DetailsView',
      'views/invoice/InvoiceView', 
    ], function($, _, Backbone, FooterView, MensView, SportsView, WomenView, ChildrenView, DetailsView, InvoiceView) {

     /* $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
          options.url = 'https://api.github.com/users/' + options.url;
      });*/
    
      

      var AppRouter = Backbone.Router.extend({
        routes: {
          // Define some URL routes
          'men': 'showMen',
          'women': 'showWomen',
          'children': 'showChildren',
          'sports': 'showSports',
          'details/:id': 'details',
          'checkout':'checkout',

          // Default
          '*actions': 'showMen'
        }
      });
        
        
      var initialize = function(){

        app_router = new AppRouter;
        
        var mensView = null;
        app_router.on('route:showMen', function () {

            if(mensView){
                mensView.cleanup();
            }
            // Displays Mens Items  
            mensView = new MensView();
            mensView.render(productsData,'All');
        });
          
        var womenView = null;  
        app_router.on('route:showWomen', function () {

             if(womenView){
                 womenView.cleanup();
             }
            // Displays Women Items  
            womenView = new WomenView();
            womenView.render(productsData,'All');
        });
        
        var childrenView = null;  
        app_router.on('route:showChildren', function () {
            
            if(childrenView){
                childrenView.cleanup();
            }
            // Displays Children Items  
            childrenView = new ChildrenView();
            childrenView.render(productsData,'All');
        });
        
        var sportsView = null;  
        app_router.on('route:showSports', function () {

            if(sportsView){
                 sportsView.cleanup();
            }
            // Displays Children Items  
            sportsView = new SportsView();
            sportsView.render(productsData,'All');
        });
          
        var detailsView = null;
        app_router.on('route:details', function (id) {

            
            if (detailsView) {
                detailsView.cleanup();
            }
            // Displays Item details  
            detailsView = new DetailsView();
            detailsView.render(productsData,{id: id});
        });
          
          
        app_router.on('route:checkout', function () {
            $('#checkoutButton').hide();
            
            
            var invoiceView = new InvoiceView();
            invoiceView.render();
            
            //window.history.back();
            
        }); 
          

        // Ajax call to load data from local file  
         $.ajax({
              type: 'GET',
              url: '../data.json',
              success: function(data) {
                productsData = data;
                if(mensView){
                  mensView.cleanup();
                }
                mensView = new MensView();
                mensView.render(productsData,'All');
              },
              error: function(){
                alert("error");
              }
        });
          
          
        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
        var footerView = new FooterView();

        Backbone.history.start();
        $('#checkoutButton').hide();
      };
      return { 
        initialize: initialize
      };
    });
