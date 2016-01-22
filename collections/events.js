Events = new Mongo.Collection('events');

Meteor.methods({
  addEvent(eventData){
    if (! Meteor.userId()) {
      throw new Meteor.Error("请登录");
    }

    check(Meteor.userId(), String);

    check(eventData, {
      name: String
    });

    var user = Meteor.user();
    var newEvent = _.extend(eventData, {
      userId: user._id,
      username: user.username,
      submited: new Date()
    });

    var eventId = Events.insert(newEvent);

    return {_id: eventId};
  },

  // 编辑
  updateEvent(eventId, eventData){
    Events.update({_id: eventId}, {$set: eventData}, function(){
      console.log("修改成功");
    });
  },
});