//在 Meteor 中，关键字 var 限制对象的作用域在文件范围内。 我们想要 Posts 作用于整个应用范围内，因此我们在这里不要 Var 这个关键字。
//在服务器，集合有一个任务就是和 Mongo 数据库联络，读取任何数据变化
//在客户端，集合是一个安全拷贝来自于实时一致的数据子集

Dogs = new Mongo.Collection('dogs');

//允许与拒绝设置(如果在服务器端操作数据，则下面的无效，可以在服务器端用  check 方法检查数据)
// update 和 remove 可以在服务器端操作，这样快速看到效果

// 何时选择服务器端的内置方法回调？何时使用客户端数据操作？ 
//1. 操作直观且可以通过 allow 和 deny 设置规则则客户端 
//2 如果用户控制之外如创建时间 uid;需要返回结果的；耗时计算需要等待的， 则服务端
Dogs.allow({
  insert: function(userId, dog){
    // 必须登录(实际上就是登陆用户的一部分数据保存进来，dogs表类似于 user_detail)
    return !!userId;
  },
  update: function(userId, dog){
    //只有所有者才能编辑 权限判断可以统一放在 permissions.js 文件中
    return ownsDocument(userId, profile);
  },
  remove: function(userId, dog){
    return ownsDocument(userId, profile);
  }
});

Dogs.deny({
  update: function(userId, dog, fieldNames){

    //只能更改如下字段
    return (_.without(fieldNames, 'like', 'job', 'figure', 'personality').length > 0);
  }
});

Meteor.methods({
  addDog(dogData){
    if (! Meteor.userId()) {
      throw new Meteor.Error("请先登录");
    }

    check(dogData, {
      nickName: String,
      mobile: String,
      sex: String,
      age: String,
      job: String,
      like: String,
      figure: String,
      personality: String
    });


    //手机号码必须唯一
    var sameMobileDog = Dogs.findOne({mobile: dogData.mobile});
    if(sameMobileDog){
      return{
        mobileExists: true,
        _id: sameMobileDog._id
      }
    }

    var newDog = _.extend(dogData, {
      userId: Meteor.userId(),
      username: Meteor.user().username,
      avatar: "_1.ico",
      followers: [],//关注他的人
      nests: [], //加入的狗窝
      events: [], // 报名的活动
      addDate: new Date()
    });

    var dogId = Dogs.insert(newDog);

    return {_id: dogId};
  },

  // 编辑
  updateDog(dogId, dog){
    // 关注 等操作 需要修改
    // if(Meteor.userId() !== dog.userId){
    //   console.log("只能编辑自己的资料");
    //   return false;
    // }

    Dogs.update({_id: dogId}, {$set: dog}, function(){
      console.log("修改成功");
    });
  },

  removeDog(dogId){
    var dog = Dogs.findOne({_id: dogId});
    Dogs.remove(dogId);
    console.log("删除成功" + dog.nickName);
  },

  //用于测试（不需要运行 meteor reset）
  removeAllDog(){
    dogs = Dogs.find();
    dogs.each(function(index, el) {
      this.removeDog(el.id);
    });
  }
});