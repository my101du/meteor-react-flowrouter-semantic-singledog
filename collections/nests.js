Nests = new Mongo.Collection('nests');

Meteor.methods({
  addNest(nestData){
    if (! Meteor.userId()) {
      throw new Meteor.Error("请登录");
    }

    check(Meteor.userId(), String);

    check(nestData, {
      name: String,
      desc: String
    });

    //狗窝名不同相同
    var sameNameNest = Nests.findOne({name: nestData.name});
    if(sameNameNest){
      return{
        nestExists: true,
        _id: sameNameNest._id
      }
    }

    var user = Meteor.user();
    var newNest = _.extend(nestData, {
      userId: user._id,
      username: user.username,
      submited: new Date()
    });

    var nestId = Nests.insert(newNest);

    return {_id: nestId};
  },

  // 编辑
  updateNest(nestId, nestData){
    Nests.update({_id: nestId}, {$set: nestData}, function(){
      console.log("修改成功");
    });
  },
});