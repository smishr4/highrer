"use strict";
define(['require'], function (require) {


  var channelIndexMapper = {};

  var subscribe = function(channel, fn, context){
    var mediator = this;
    var subscription = {};
    //If wildcard subscription
    if(channel.indexOf('*')!==-1){
      if (!mediator.wildcardchannels[channel]) mediator.wildcardchannels[channel] = {};
      if (!channelIndexMapper[channel]) channelIndexMapper[channel] = 1;
      var index = channelIndexMapper[channel]++;
      mediator.wildcardchannels[channel][index]={ context: context || this, callback: fn };


      subscription = {
          unSubscribe : function(){
            delete mediator.wildcardchannels[channel][index];
          }
      };

      if(context) {
        if(!context.arrSubscriptions) context.arrSubscriptions=[];
        context.arrSubscriptions.push(subscription);
      }


    } else {


      if (!mediator.channels[channel]) mediator.channels[channel] = {};
      if (!channelIndexMapper[channel]) channelIndexMapper[channel] = 1;
      var index = channelIndexMapper[channel]++;
      mediator.channels[channel][index]={ context: context || this, callback: fn };


      subscription = {
          unSubscribe : function(){
            delete mediator.channels[channel][index];
          }
      };

      if(context) {
        if(!context.arrSubscriptions) context.arrSubscriptions=[];
        context.arrSubscriptions.push(subscription);
      }

    }


    return subscription;
  };

  var publish = function(channel){
    var mediator = this;


    /*** Experimental wildcard publish start **/
    var channels = [];

    for(wildcardchannelIndex in mediator.wildcardchannels){
      if(mediator.wildcardchannels[wildcardchannelIndex].indexOf(channel)!==-1){
        channels.push(mediator.wildcardchannels[wildcardchannelIndex]);
      }
    }

    for(channelIndex in channels){
      var arrSubscriptions = channels[channelIndex];
      //var arrSubscriptions = mediator.channels[channel];
      for(var subscriptionIndex in arrSubscriptions){
        var subscription = mediator.channels[channel][subscriptionIndex];
        subscription.callback.apply(subscription.context, args);
      }

    }

    /*** Experimental wildcard publish end **/


    //If no valid channel found for publishing
    if (!mediator.channels[channel] ) return false;

    var args = Array.prototype.slice.call(arguments, 1);

    var arrSubscriptions = mediator.channels[channel];
    for(var subscriptionIndex in arrSubscriptions){
      var subscription = mediator.channels[channel][subscriptionIndex];
      /*// experimental invokewithhook
      if(subscription.context instanceof Backbone.View){
        var fnName = "";
        for(var index in subscription.context){
          if(subscription.context[index]===subscription.callback){
            fnName = index;
            break;
          }
        }

        args.splice(0,0,fnName);
        subscription.context.invokeWithHook.apply(subscription.context, args);
      }*/
      subscription.callback.apply(subscription.context, args);

    }
    return this;
  };


  var registerChildren = function(children, parent){

    if(!children || !parent){
      console.log('error in registering children');
      console.log(parent);
      console.trace();
      return;
    }

    if(!parent.children) parent.children=[];

    if(!(children instanceof Array)){
      children = [children];
    }
    parent.children = $.merge(parent.children, children) ;
  };






  var destroy = function(component){

    var arrSubscriptions = null;
    try {
      arrSubscriptions = component.arrSubscriptions;
    } catch (e){
      console.log(e);
      console.trace();
    }
    var children = component.children;
    var mediator = this;

    _.each(arrSubscriptions, function(subscription){
      subscription.unSubscribe();
    });

    if(component instanceof Backbone.View){
      //Should find better way of destroying the view
      component.stopListening();
      component.off();
      component.undelegateEvents();
      $(component.el).html('');
    }

    _.each(children, function(child){
      mediator.destroy(child);
    });

    if(component.view){
      this.destroy(component.view);
    }

    if(component.onDestroy){
      component.onDestroy();
    }
  };

  return {
    channels: {},
    wildcardchannels : {},
    publish: publish,
    subscribe: subscribe,
    registerChildren : registerChildren,
    destroy :destroy
  };


});
