define([
  'jquery',
  'underscore',
  'backbone',
  'models/sports/SportsModel'
], function($, _, Backbone, SportsModel){
  var SportsCollection = Backbone.Collection.extend({
    model: SportsModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return SportsCollection;
});