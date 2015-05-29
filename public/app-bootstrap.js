define(function(require){

    var Login = require('modules/login/login');
    var App = require('modules/app/app');
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
          var container = $('.app-container');
          var loginContainer = $('.app-container');
          var appView = new App({el:container});
          var loggedIn = location.href.indexOf("session=true")!=-1;
          if(loggedIn){
            $.get('user', function(data){
              eventImpl.publish('SHOW:APP', data);
            });
          } else {
            new Login({el:loginContainer});
          }
          //eventImpl.publish('SHOW:APP', data);
        }
    });

    new BootloaderView();

});


