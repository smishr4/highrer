define(function(require){

  var Backbone = require('backbone');
  var template = require('text!./profile.html');
  var eventImpl = require('eventImpl');
  var Handlebars = require('handlebars');


  var ProfileView = Backbone.View.extend({
    initialize : function(options){
      this.$el = options.el;
      this.render();

    },
    template : Handlebars.compile(template),
    render : function(data){

      this.$el.html(this.template(data));
    },
    events : {
      'click .give' : 'giveReferences',
      'click .want' : 'wantReferences'
    },
    giveReferences : function(){
      require(['modules/feed/feed'], function(feedView){

      });
    },
    wantReferences : function(){
      require(['modules/feed/feed'], function(feedView){

      });
    }
  });

  return ProfileView;

})
