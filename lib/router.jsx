FlowRouter.route('/', {
  triggersEnter: [function(context, redirect, stop){
    redirect("/dogList");
  }],
  action: function(params, queryParams){
  }
});


/**
* 用户列表(寻找)
*/
var dogListGroup = FlowRouter.group({
  name: 'dogListGroup',
  prefix: '/dogList',
  subscriptions: function(){
    
  },
  triggersEnter: []
});

dogListGroup.route("/:sortType?/:limit?", {
  name: 'dogList',
  triggersEnter: [function(context, redirect, stop){

  }],
  subscriptions: function(){
    //var selector = {category: {$ne: "private"}};
    this.register('dogList', Meteor.subscribe('dogs'));//, selector
  },
  action: function(params, queryParams){
    var sortType = params.sortType || 'nickName';
    var limit = parseInt(params.limit) || 100;
    ReactLayout.render(Container, {content: <DogList sortType={sortType} limit={limit} />})
  },
});


/**
* 用户详情
*/
FlowRouter.route('/dogDetail/:dogId', {
  name: 'dogDetail',
  triggersEnter: [],
  subscriptions: function(){
    //var selector = {category: {$ne: "private"}};
    this.register('dogs', Meteor.subscribe('dogs'));//, selector
  },
  action: function(params, queryParams){
    ReactLayout.render(Container, {content: <DogDetail dogId={params.dogId} />})
  }
});


/**
* 狗窝（组织）列表
*/
FlowRouter.route('/nestList', {
  name: 'nestList',
  subscriptions: function(){
    this.register('nests', Meteor.subscribe('nests'));

    // 要显示“加入”的用户列表，也要订阅这个publish
    this.register('dogList', Meteor.subscribe('dogs'));
  },
  action: function(params, queryParams){
    ReactLayout.render(Container, {content: <NestList />});
  }
});



/**
* 活动列表
*/
FlowRouter.route('/eventList', {
  name: 'eventList',
  subscriptions: function(){
    this.register('events', Meteor.subscribe('events'));//, selector

    this.register('dogList', Meteor.subscribe('dogs'));
  },
  action: function(params, queryParams){
    ReactLayout.render(Container, {content: <EventList />});
  }
});


/**
* 我的（首页）
*/
var myGroup = FlowRouter.group({
  prefix: '/my',
  name: 'myGroup',
  subscriptions: function(){
    this.register('dogDetail', Meteor.subscribe('dogDetail', Meteor.userId()));
    this.register('dogs', Meteor.subscribe('dogs'));
    this.register('nests', Meteor.subscribe('nests'));
    this.register('events', Meteor.subscribe('events'));
  },
  triggersEnter: [checkLogin]
});

myGroup.route('/', {
  name: 'my',
  action: function(params, queryParams){
    ReactLayout.render(Container, {content: <My />});
  }
});


/**
* 我的个人资料
*/
myGroup.route('/profile', {
  name: 'myProfile',
  action: function(params, queryParams){
    dogData = Dogs.findOne({userId: Meteor.userId()});

    ReactLayout.render(Container, {content: <MyProfile dogData={dogData} />});
  }
});


/**
* 我的关注
*/
myGroup.route('/follow', {
  name: 'myFollow',
  triggersEnter: [checkProfile],
  action: function(params, queryParams){
    
    dogData = Dogs.findOne({userId: Meteor.userId()});
    followerIds = [];

    var dogs = Dogs.find().fetch();
    
    _.map(dogs, function(dog){
      if(_.contains(dog.followers, dogData._id)){
        followerIds.push(dog._id);
      }
    });

    //console.log(nestIds);
    ReactLayout.render(Container, {content: <DogList dogIds={followerIds} />});
  }
});

/**
* 我的短消息
*/
myGroup.route('/message', {
  name: 'myMessage',
  triggersEnter: [checkProfile],
  action: function(params, queryParams){
    ReactLayout.render(Container, {content: <MyMessage />});
  }
});


/**
* 我加入的狗窝（使"狗窝列表"组件）
*/
myGroup.route('/nest', {
  name: 'myNest',
  triggersEnter: [checkProfile],
  subscriptions: function(){
    // 要显示“加入”的用户列表，也要订阅这个publish
    this.register('dogList', Meteor.subscribe('dogs'));
  },
  action: function(params, queryParams){
    //找出用户加入过的狗窝列表（没有用非规范化来提高查询性能）
    dogData = Dogs.findOne({userId: Meteor.userId()});
    nestIds = [];

    var nests = Nests.find().fetch();
    
    _.map(nests, function(nest){
      if(_.contains(nest.users, dogData._id)){
        nestIds.push(nest._id);
      }
    });

    //console.log(nestIds);
    ReactLayout.render(Container, {content: <NestList nestIds={nestIds} />});
  }
});


/**
* 我报名的活动
*/
myGroup.route('/event', {
  name: 'myEvent',
  triggersEnter: [checkProfile],
  subscriptions: function(){
    //this.register('events', Meteor.subscribe('events'));
    //this.register('dogs', Meteor.subscribe('dogs'));
  },
  action: function(params, queryParams){
    //找出用户加入过的活动
    var dogData = Dogs.findOne({userId: Meteor.userId()});
    var eventIds = [];

    var events = Events.find().fetch();
    _.map(events, function(ele){
      if(_.contains(ele.applicants, dogData._id)){
        eventIds.push(ele._id);
      }
    });
    // console.log(eventIds);
    ReactLayout.render(Container, {content: <EventList eventIds={eventIds} />});
  }
});


/**
* not found
*/
FlowRouter.notFound = {
  subscriptions: function(){},
  action: function(){
    console.log("404 not found");
  }
};


/**
* 检查是否登录
*/
function checkLogin(context, redirect, stop){
  if(!Meteor.user()){
    alert("请先登录");
    stop();
  }
}


/**
* 检查是否已经完善个人资料（在“我的”几个选项里使用）
*/
function checkProfile(context, redirect, stop){

  var profile = Dogs.findOne({userId: Meteor.userId()});
  if(profile == undefined){
    alert("请先完善个人资料");
    FlowRouter.go("/my/profile");
  }
}