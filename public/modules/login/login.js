define(function(require){

  var Handlebars = require('handlebars');
  //var FBAPI = require('modules/facebook-api/fb-api');
  var template = require('text!./login.html');
  var Backbone = require('backbone');
  //var eventImpl = require('eventImpl');

  var LoginView = Backbone.View.extend({
    initialize : function(options){
      this.$el = options.el;
      this.render();
    },
    template : Handlebars.compile(template),
    render : function(data){
      this.$el.html((this.template(data)))
    },
    events : {
      'click a.facebook' : 'doFacebookLogin'
    },
    doFacebookLogin : function(){
      var _this = this;

      location.href = "/users/auth/facebook";

      //eventImpl.publish('SHOW:APP', data);

      // FBAPI.checkAndDoLogin({
      //   callback : function(data){
      //     alert('Facebook login completed', JSON.stringify(data));
      //     eventImpl.publish('SHOW:APP', data);
      //     _this.remove();
      //   }
      // });
    }
  });

  return LoginView;
});
