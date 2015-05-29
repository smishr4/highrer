define(function(require){
  var Backbone = require('backbone');
  var Hanndlebars = require('handlebars');
  var Backbone = require('backbone');
  var eventImpl = require('eventImpl');
  var template = require('text!./app.html');

  var AppView = Backbone.View.extend({
    initialize : function(options){
      var _this = this;
      this.$el = options.el;
       eventImpl.subscribe('SHOW:APP', function(data){
        var firstTimeUser = true;
        if(firstTimeUser){
          require(['modules/profile/profile'], function(Profile){
            var profileView = new Profile({ el : _this.$('.app-child-container')});
            profileView.render(data);
          });
        } else {
          require(['modules/feed/feed'], function(){
            var feedView = new Feed({el : _this.$('.app-child-container')});
            feedView.render(data)
          });
        }
       });


      this.render();


    },
    template : Hanndlebars.compile(template),
    render : function(data){
      this.$el.html(this.template())
    }
  });
  return AppView;
})
