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
    template : _.template(template),
    render : function(data){
      this.$el.html(this.template({user_list: []}))
    },
    events : {
      'change .skill' : 'searchCandidates',
      'click .user' : 'showUserDetails',
      'click .logout-link' : 'logout'
    },
    searchCandidates : function(e){
      var skill = $(e.currentTarget).val();
      var _this = this
      $.ajax({
        url: '/search/' + skill,
        type: 'GET',
        dataType: 'JSON',
        success: function(data, response, options) {
          require(['modules/userlistitem/userlistitem'], function(userlistitem) {
            var x = new userlistitem({data: data, el : this.$('#list')});
          })
        },
        error: function(data, response, options) {
          alert(response.message)
        }
      })
    },

    showUserDetails: function(e) {
      require(['modules/user_details/user_details'], function(user_details) {
        var x = new user_details({id: e.target.id});
      })
    },
    logout : function(){
      $.ajax({
        url : 'user/logout'
      })
    }
  });
  return AppView;
})
