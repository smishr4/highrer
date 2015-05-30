define(function(require){
  var Backbone = require('backbone');
  var Hanndlebars = require('handlebars');
  var Backbone = require('backbone');
  var eventImpl = require('eventImpl');
  var template = require('text!./app.html');
  var css = require("css!./app.css")

  var AppView = Backbone.View.extend({
    initialize : function(options){
      var _this = this;
      this.$el = options.el;
       eventImpl.subscribe('SHOW:APP', function(data){
        require(['modules/feed/feed'], function(){
          var feedView = new Feed({el : _this.$('.app-child-container')});
          feedView.render(data)
        });
       });


      this.render();


    },
    template : Hanndlebars.compile(template),
    render : function(data){
      this.$el.html(this.template({user_list: []}))
    },
    events : {
      'change .skills' : 'searchCandidates'
    },
    searchCandidates : function(e){
      var skill = $(e.currentTarget).val();
      $.ajax({
        url: '/search/' + skill,
        type: 'POST',
        dataType: 'JSON',
        success: function(data, response, options) {
          this.$el.html({user_list: data})
        },
        error: function(data, response, options) {
          alert(response.message)
        }
      })
    }
  });
  return AppView;
})
