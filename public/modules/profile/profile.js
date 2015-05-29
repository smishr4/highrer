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
      $.ajax({
        url : 'user/update',
        method : 'post',
        data : ({
          user: {
            type: 1
          }
        }),
        success : function(){
          require(['modules/app/app'], function(AppView){
            var appView = new AppView({el : $('.app-container')});
            appView.render();
            _this.remove();
          })
        }
      });
    },
    wantReferences : function(){
      _this = this;
      $.ajax({
        url : 'user/update',
        method : 'post',
        data : ({
          user: {
            type: 1
          }
        }),
        success : function(){
          require(['modules/app/app'], function(AppView){
            var appView = new AppView({el : $('.app-container')});
            appView.render();
            _this.remove();
          })
        }
      });


    }
  });

  return ProfileView;

})
