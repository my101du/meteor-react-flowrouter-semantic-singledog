# 简介

git stash develop branch, and checkout a new branch issus-001 form master, fix it then merge, delete issus-001 branch at last.
then restore the develop branch from stash

Tony哥给了我大把的资料，让我尽快熟悉 `Meteor` 结合 `React` 的开发相关知识。

有道是“师傅领进门，修行在个人”。虽然这些资料都是经过了精挑细选的，可以避免我少走弯路。但作为一个之前大部分时间做 PHP 后端开发的“伪全栈”，短时间要学会还真不容易。再加上最近又是加班赶工年尾项目，又是搬新公司忙着当苦工和网管，学习时间也不是很充足。

不过总算是捣鼓出一个“还能跑起来”的应用了。并且在这个过程中，从对概念的一知半解，到慢慢看代码越来越顺畅，最后自己能敲出来（虽然质量很烂），真的是苦尽甘来啊。

这个应用叫**“单身狗配对“**，分为如下几个模块:

* ”寻狗“：实际上就是用户列表啦，可以排序，以及搜索，并且关注他人，以及给感兴趣的人发消息（未完成）
* ”狗窝“：就是群组，用户可以加入群组，创建群组
* ”活动“：用户可以报名参加活动，群组发布集体活动
* ”我的“：编辑个人资料，查看消息列表，查看自己关注的人、已加入的狗窝、已报名的活动
* 登录注册：没什么好说的，使用的 meteor 自带账号系统


**访问地址(请全程全局翻墙，由于网络和开发时间、水平有限，可能会有一些奇怪的bug)**

[meteor-单身狗配对](http://my101du-singledog.meteor.com)


**截图**

![](http://itjiaoshou.qiniudn.com/foreground/meteor-react-flowrouter-layout-semantic/dog-list.png)

![](http://itjiaoshou.qiniudn.com/foreground/meteor-react-flowrouter-layout-semantic/nest-list.png)

![](http://itjiaoshou.qiniudn.com/foreground/meteor-react-flowrouter-layout-semantic/my-profile.png)



**已经使用到的技术清单**

* Meteor 基础开发框架(以及自带的 `MongoDB`，`accounts-ui`,`check` 等 packages)
* `Meteor-React` 前端库
* `FlowRouter` 客户端路由
* `react-layout` 结合 `FlowLayout` 实现 `react JSX` 的布局
* `Semantic-UI` 前端界面库
* 其他 Meteor 插件


# 创建 meteor 项目并添加所有必需的包

```bash
$ meteor create SingleDog
$ cd SingleDog
$ meteor add [包名]

//安装完毕后请运行 meteor list 命令对照着下面的清单，补上所有需要的包

$ meteor list

accounts-password         1.1.4  Password support for accounts
accounts-ui               1.1.6  Simple templates to add login widgets to an app
audit-argument-checks     1.0.4  Try to detect inadequate input sanitization
blaze-html-templates      1.0.1  Compile HTML templates into reactive UI with Meteor Blaze
check                     1.1.0  Check whether a value matches a pattern
ecmascript                0.1.6* Compiler plugin that supports ES2015+ in all .js files
es5-shim                  4.1.14  Shims and polyfills to improve ECMAScript 5 support
flemay:less-autoprefixer  1.2.0  The dynamic stylesheet language + Autoprefixer
jquery                    1.11.4  Manipulate the DOM using CSS selectors
kadira:flow-router        2.10.0  Carefully Designed Client Side Router for Meteor
kadira:react-layout       1.5.3  Layout Manager for React with SSR Support
meteor-base               1.0.1  Packages that every Meteor app needs
mobile-experience         1.0.1  Packages for a great mobile user experience
mongo                     1.1.3  Adaptor for using MongoDB and Minimongo over DDP
react                     0.14.3* Everything you need to use React with Meteor.
semantic:ui               2.1.7  Official Semantic UI Integration for Meteor
semantic:ui-css           2.1.2  Semantic UI - CSS Release of Semantic UI
session                   1.1.1  Session variable
standard-minifiers        1.0.2  Standard minifiers used with Meteor apps by default.
tracker                   1.0.9  Dependency tracker to allow reactive callbacks

// 然后运行起来
$ meteor reset
$ meteor
```


# 把目录结构安排好，一个良好的目录结构和清晰的命令可以在项目变大的时候容易找到

好吧，其实我这里的命名不是很清晰，英语捉急

```bash
$ tree -L 3

├── README.md
├── client                       / 存储在客户端运行的代码
│   ├── index.html                |- 入口文件
│   ├── scripts                  / js代码和 JSX 组件（React）
│   │   ├── Container.jsx         |- React 组件容器
│   │   ├── DogAvatar.jsx         |- 狗头……（就是”关注者“等一小堆头像）
│   │   ├── DogDetail.jsx         |- 狗详情
│   │   ├── DogList.jsx           |- 狗列表，以及单个列表元素
│   │   ├── EventList.jsx         |- 活动列表，以及单个活动元素
│   │   ├── Header.jsx            |- 头部，包括顶部菜单、用户账号组件
│   │   ├── My.jsx                |- ”我的“
│   │   ├── MyProfile.jsx         |- 个人资料编辑
│   │   ├── NestList.jsx          |- "狗窝"列表，以及单个列表元素
│   │   └── main.jsx              |- React的”入口“，Meteor.startup 写在这里，并 render 根组件
│   ├── styles                   / 样式文件
│   │   └── common.css
│   ├── templates                / 模板文件(如果用 React 做前端库，应该就不用了)
│   │   └── includes
│   └── ui                       / 把 meteor 的 Blaze 组件（例如 accounts）封装成 React 能用的
│       └── AccountsUIWrapper.jsx
├── collections                  / mongodb 的 collection 定义，以及数据 methods
│   ├── dogs.js                   |- 狗
│   ├── events.js                 |- 活动
│   ├── messages.js               |- 短消息
│   └── nests.js                  |- 狗窝
├── globals                      / 为了去掉 google fonts 添加的，好像没效果
│   └── site.variables.import.less
├── lib                          / 公共函数库、路由
│   ├── permissions.js            |- 检查权限的一些函数
│   └── router.jsx                |- 路由定义
├── public                       / 存储服务端和客户端共同使用的文件，如图片等
│   └── images
│       ├── Aaron\ Adams.ico
│       ├── Andy\ Skowronski.ico
│       ├── Carman\ Lee.ico
│       ├── Cecilia\ Cheung.ico
│       └── Tess\ Bethune.ico
└── server                       / 只在服务器端运行的程序，如下面的初始化测试数据，和 publish 定义
    ├── initData.js               |- 初始化测试数据
    └── publish.js                |- Collection 的 publish 定义
```


# 所有一切的入口 index.html

```html
<body></body>
```

什么？你没搞错吧，入口文件怎么会只有这这个东西？`head` 呢，`html`呢？

其实我一开始也很疑惑，后来遇到把 `Blaze` 的 `LoginButton` 组件封装成 React JSX 组件后，嵌入到代码里被渲染两次的问题，查资料才知道，`React`结合 `Reac-tLayout`会自动生成完整的页面 `DOM` ，所以直接删掉就好了。



# 进了入口之后，往哪个方向走？

开始编辑路由文件 `/client/lib/router.jsx` 吧，由于结构不是很复杂，基本上都是重复的代码，就不截取代码了，弄清楚模块和路径的对应关系即可。

由于我们已经安装了 `FlowRouter`和`React-Layout`两个包，所以是可以支持下面这种 `ReactLayout.render` 的布局方法的，注意和 meteor 默认的 `Blaze`布局方法比较相似，只是关键词不同而已。

```javascript
ReactLayout.render(Container, {content: <DogList sortType={sortType} limit={limit} />})
```

主要注意几点：

1. 部分路由里，需要添加 `triggersEnter`对用户是否登录进行判断
2. 尽可能在 `render` 的时候，把数据传入 `JSX` 组件，减少 `React` 再次处理数据(因为有莫名其妙的读取和渲染两次问题)
3. 在需要数据的时候，提前用 `subscriptions` 订阅好


# Collections 定义与测试数据

在这个应用里，我们用了 4 个 collectoin，都放在 `/collections`目录里面，分别对应一个 js 文件。

1. Dogs: 狗（用户）
2. Events: 活动
3. Nests: 狗窝（群组）
4. Messages: 短消息

每个文件的第一行都是类似下面的代码，因为 collection 是放在根目录下（而不是 `client`目录），所以会自动在客户端和服务端保持数据的一致

```javascript
Dogs = new Mongo.Collection('dogs');
```

先不急着在里面添加 `methods`、和 `allow`,`deny`权限设置，先添加一些测试数据。

写一个测试数据初始化文件放在 `/server`里，叫`initData.js`,这样每次启动 `meteor`命令后，会自动在服务器端插入数据到 mongodb 里面，客户端也可以直接读取。

1. 先添加一些”狗“，每次 `insert`数据后，会返回这条新数据的 `_id`(由 mongodb 自动生成的)，便于后面直接使用
2. ”狗“的 `followers` 字段是一个数组，存储关注TA的所有”狗“的`_id`（注意不是”用户id“）
3. ”狗窝“的 `users`字段，和”活动“的`applicants`字段，分别表示”成员“，和”报名者“，也是一个数组，存储”狗“的`_id`

```javascript
/**
 * 狗
 */
var dogsCount = Dogs.find().count();
console.log("dogsCount", dogsCount);
if (dogsCount === 0) {
    console.log("0 dogs, need fill test data");
    dogId_1 = Dogs.insert({
        userId: '1',
        nickName: '霸王别挤',
        mobile: '18173782161',
        sex: 'male',
        age: '22',
        job: '公务员',
        like: '运动,跑步',
        avatar: 'Aaron Adams.ico',
        figure: '1',
        personality: '1',
        followers: []
    });
    dogId_2 = Dogs.insert({
        userId: '2',
        nickName: '轻舞飞扬',
        mobile: '17173782162',
        sex: 'female',

后面的略……

/**
 * 狗窝
 */
var nestsCount = Nests.find().count();
console.log("nestsCount", nestsCount);
if (nestsCount === 0) {
    Nests.insert({
        name: '科技园单身狗俱乐部',
        desc: '我们是一批码农, 长在青青草原上',
        users: [dogId_1, dogId_2]
    });
    Nests.insert({
        name: '大长腿妹子',
        desc: '颜值高，身材好，关键还能修电脑',
        users: [dogId_5, dogId_6]
    });

后面的略……
```



# 服务器端的 Publish 

编辑 `/server/publish.js`文件，写好所有的 `publish`规则，而对应的客户端的 `subscribe`还记得么？在 `router.jsx`里路由已经匹配好了。

```javascript
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
```


# 以 `dogs.js`为例，添加服务端的 `methods` 

服务端的数据处理，无外乎**增删改查**，我们以操作”狗“这个 `Collection`为例，主要有 `addDog`,`updateDog`两个 `method`。

1. 添加数据的时候，用 `check`方法来检查这些数据是否有值（`check`是一个 meteor 的包） 
2. 然后判断某个数据是不是重复（例如手机号码不能重复）
3. 用 meteor 捆绑的 `Underscore.js`工具库，来”扩展“提交过来的数据，因为`userId`字段需要读取当前登录的用户id，为了确保不被客户端伪造，所以在服务端来生成。
4. 最后插入数据，返回新数据的 `_id`

按这样的流程，把几个 `collection` 对应的文件都添加好 `methods`。


```javascript
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

    Dogs.update({_id: dogId}, {$set: dog}, function(){
      console.log("修改成功");
    });
  },
```


# 开始进入”React“和”JSX“的世界

其实前面大部分的内容，都还是和 `meteor`有关，只是在 `router.js`里偶尔夹杂一些`react-layout`有关的东西。那我们的应用既然是用 `React`作为前端库，下面就要把重心放到 `组件`来了。

在`/client/scripts`目录里，我们已经把所有的组件都创建好了。

由于最复杂的就是 `DogList.jsx`，所以就详细来解说这个文件里的两个组件（叫`Component`）。

在这个文件里，虽然叫`DogList`，但其实里面同时写有两个组件的

* 列表, 对应 `DogList = React.createClass`
* 列表里的单个元素, 对应 `DogOfList = React.createClass`

因为它们实际上是一个整体，所以放一起方便修改，当然了如果应用很复杂或者有团队协作需求，还是建议拆开成不同的文件来存放。

每个组件都可以实现如下几个方法/获取参数：

```javascript
  // 这个应该就是实现”桥接“ meteor 的数据给 react 读取所必须的 mixins 列表了。没有它，react 就读不到 meteor 传过来的数据了
  mixins: [ReactMeteorData],

  // 这个方法返回的数据，可以通过  this.data.dataName 来读取
  getMeteorData() {
    return {}
  },

  getInitialState() {
      return {};
  },

  // 设置默认的 props
  getDefaultProps: function() {
    return {};
  },

  // 组件加载完毕后调用，例如可以初始化 semantic-ui 的 modal 弹窗控件
  componentDidMount(){

  },

  // 组件有数据更新的时候调用（这个在和 Semantic-UI 的一些交互控件组合的时候有用）
  componentDidUpdate() {

  },

  // componentDidMount() {},

  // componentWillReceiveProps() {},
  // shouldComponentUpdate() {},
  // componentWillUpdate() {},
  // componentDidUpdate() {},

  // componentWillUnmount() {},


  // 这里定义你自己的所有方法，对应 render 里绑定给组件事件的 {this.funcName}
  YourFunction1(){

  },

  YourFunction2(){

  },

  //……

  render(){
    return (
      <div>
        组件内部{this.props.dataName}
        <a onClick={this.YourFunction1}>动作</a>
      </div>
    )
  }
```

具体的业务流程代码看各个文件即可，特别注意的是，因为这里都是 `client`端，所以操作 `Collection` 是要使用`Meteor.call('服务器端的method名', 参数, 回调函数)`来调用服务端定义的`method`的。

```javascript
Meteor.call('updateDog', this.props.dogData._id, {followers: currentFollowers}, function(error, result){
        console.log("关注成功");
      });
```

**一些疑问**

由于我对 React 还是初学阶段，经常出现数据被读取两次，界面被渲染两次的现象。网上查资料，有各种各样的说法，例如停掉 fast-render 啊，用 subscription 的 handler 等等。还没时间细究。



# 美化界面

我们使用的是 `Semantic-UI`这个界面库，而不是常见的 `BootStrap`。
这个库我个人觉得效果比 bootstrap 要漂亮一点，还有就是组件齐全一点。但是因为其”语义化“，如果设置 class 的时候顺序不对，它是会出错的……

这里就不多说了，直接看文档，了解布局、组件、以及一些基本的”参数”即可（这些参数是对所有组件都通用的，例如大小、颜色、对齐等等，一通百通）

特别是“集成“那一章，说清楚了与其他 js 库/开发框架结合的方法。

**特别注意**

由于使用了 `React`, 我们要仔细检查所有 `render`里含有 `semantic`的代码，有两个小失误是经常遇到的，会导致浏览器报错

1. 遗漏了某个 `class`,忘了把它改成`className`
2. 所有html元素必须符合 xhtml 严格规范，例如 `img`等, 必须要闭合标签！



# 部署

本来想学习下 `pm2-meteor`的，但是我的阿里云主机上装的是 `CentOS 6`，在装 `node` 的时候提示`g++` 版本太低，而重新编译安装耗时太长了。

>WARNING: C++ compiler too old, need g++ 4.8 or clang++ 3.4 (CXX=g++)


还是先部署到 `meteor.com`吧。虽然慢得像乌龟一样……

```bash
$ meteor deploy singledog.meteor.com
```

可以在浏览器打开 `http://singledog.meteor.com` 查看了，由于国内网速的原因和当前阶段技术能力不足，会有一些诡异的问题出现……



# 参考资料

**主要学习资料**

* Meteor ：https://www.meteor.com
* ReactJS：https://facebook.github.io/react/
* FolwRouter ：https://atmospherejs.com/kadira/flow-router
* ReactJS Layout：https://github.com/kadirahq/meteor-react-layout 支持flow router
* Smantic UI：http://semantic-ui.com/
* Discover Meteor 中文版： http://wiki.jikexueyuan.com/project/discover-meteor/overwise.html
* https://atmospherejs.com 使用 Meteor 包的说明

**一些社区与搜索来源**

* Google 搜关键词 "meteor + xxxxx, react + xxxx"
* StackOverFlow 学英语
* GitHub 看不懂说明直接看代码
* https://crater.io
* http://www.meteorhub.org/  Meteor 中国社区
* http://react-china.org/ React 中国
