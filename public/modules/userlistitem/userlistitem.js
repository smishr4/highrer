define(function(require){
  var Backbone = require('backbone');
  var template = require('text!./userlistitem.html');

  var ListItem = Backbone.View.extend({
    initialize : function(options){
      this.data = options.data
      this.$el = options.el
      this.render()
    },
    template : _.template(template),
    render :  function(){
      this.$el.html(this.template({user_list: this.data}))
    }
  });
  return ListItem;
});
