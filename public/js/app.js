window.App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 11
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

App.Router.map(function() {
  this.resource('posts', function() {
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.PostsIndexRoute = Ember.Route.extend({
  setupController: function() {
    this.controllerFor('posts').set('posts_var', this.modelFor('posts'));
  }
});

/* Models */
App.Post = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string')
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: function(type){
    return '_id';
  }.property()
});

App.PostsController = Ember.ArrayController.extend({
  actions: {
    createPost: function() {
      if (this.get('title') != undefined && this.get('text') != undefined) {
        var title, text;
        title = this.get('title').trim();
        text = this.get('text').trim();

        var post = this.store.createRecord('post', {
          title: title,
          text: text
        });
        post.save();
      }
      else {
        console.log('fields not filled in');
      }
    }
  }
});
