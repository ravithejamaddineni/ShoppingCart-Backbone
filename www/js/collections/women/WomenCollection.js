define([
  'jquery',
  'underscore',
  'backbone',
  'models/women/WomenModel'
], function($, _, Backbone, WomenModel){
  var WomenCollection = Backbone.Collection.extend({
    model: WomenModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return WomenCollection;
});
