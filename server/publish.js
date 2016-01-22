Meteor.publish("dogs", function () {
  return Dogs.find({});
});

Meteor.publish("dogDetail", function (userId) {
  return Dogs.findOne({userId: userId});
});

Meteor.publish('nests', function(){
  return Nests.find({});
});

Meteor.publish('events', function(){
  return Events.find({});
});