define([
  'jquery',
  'underscore',
  'backbone',
  'models/men/MenModel'
], function($, _, Backbone, MenModel){
  var MenCollection = Backbone.Collection.extend({
    model: MenModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return MenCollection;
});
