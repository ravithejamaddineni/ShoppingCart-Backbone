define([
  'jquery',
  'underscore',
  'backbone',
  'models/children/ChildrenModel'
], function($, _, Backbone, ChildrenModel){
  var ChildrenCollection = Backbone.Collection.extend({
    model: ChildrenModel,
    
    initialize: function(){

      //this.add([project0, project1, project2, project3, project4]);

    }

  });
 
  return ChildrenCollection;
});
