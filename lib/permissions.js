//检查用户是否拥有文档
ownsDocument = function(userId, doc){
  return doc && doc.userId === userId;
}

//检查用户是否登录并有“profile”数据
checkHasProfile = function(){
  if(_.isNull(Meteor.userId())){
    alert("请先登录");
    return false;
  }

  dog = Dogs.findOne({userId: Meteor.userId()});

  if(!dog){
    alert("请先完善个人资料");
    return false;
  }
}