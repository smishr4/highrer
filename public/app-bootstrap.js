define(function(require){

    var Login = require('modules/login/login');
    var Profile = require('modules/profile/profile');
    var swipe = require('swipe');
    var Backbone = require('backbone');
    var $ = require('jquery');
    //var material = require('material');
    var eventImpl = require('eventImpl');


    function registerSwipeHandlers(){
        $("body").swipe({
        swipeRight:function(event, direction, distance, duration, fingerCount) {
          if ($(".menu-right").hasClass("open")) {
            $(".right-menu").trigger("click");
          } else {
            $(".left-menu").trigger("click");
          }
        },
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
          if ($(".menu-left").hasClass("open")) {
            $(".left-menu").trigger("click");
          } else {
            $(".right-menu").trigger("click");
          }
        },
        excludedElements:$.fn.swipe.defaults.excludedElements + ", .switch",
        fallbackToMouseEvents:false,
        maxTimeThreshold:300
      });

    }
    registerSwipeHandlers();

    var BootloaderView = Backbone.View.extend({
        initialize : function(options){
            this.render(options);
        },
        render : function(data){
          var appContainer = $('.app-container');
          var loginContainer = $('.app-container');

          var loggedIn = location.href.indexOf("session=")!=-1;
          if(loggedIn){
            var url = location.href;
            var token = url.substr(url.indexOf("session=")+8);
            token = token.replace("#_=_", "");
            window.authenticity_token = token;
            $.get('user', function(data){
              //eventImpl.publish('SHOW:APP', data);
              if(!data.type){
                var profileView = new Profile({el : loginContainer});
                profileView.render(data);
              } else {
                var appView = new App({el:appContainer});
                //appView.render();
              }
            });
          } else {
            new Login({el:loginContainer});
          }
          //eventImpl.publish('SHOW:APP', data);
        }
    });

    new BootloaderView();

});


