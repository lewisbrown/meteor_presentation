Persons = new Meteor.Collection("persons");

if (Meteor.isClient) {

  Template.list.helpers({
    persons: function () {
      return Persons.find({}, {sort: {score: -1, name: 1}});
    },

    selected_name: function () {
      var person = Persons.findOne(Session.get("selected_person"));
      return person && person.name;
    }
  });

  Template.person.helpers({
    selected: function() {
      return Session.equals("selected_person", this._id) ? "selected" : "";
    }
  });

  Template.list.events({
    'click input.inc': function () {
      Persons.update(Session.get("selected_person"), {$inc: {score: 1}} );
    }
  });

  Template.person.events({
    'click': function() {
      Session.set("selected_person", this._id);
    }
  });
  
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Persons.find().count() === 0 ) {
      _.each(["Emmy Noether",
              "Lee Smolin",
              "Albert Einstein",
              "Roger Penrose",
              "Richard Feynman",
              "Illya Prignogine",
              "Stephen Hawkings",
              "Ludwig Boltzmann"], function (name) {
                                     Persons.insert({name: name, score: 0});
                                     });
      }
  });
}
