/**
* 列表
*/
DogList = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var selector = {};

    if(this.props.dogIds ){
      selector = {_id: {$in: this.props.dogIds}};
    }

    Session.set('sortType', this.props.sortType);

    var sort = (this.props.sortType == 'age') ? {age: -1} : {nickName: -1};
    var limit = this.props.limit ? parseInt(this.props.limit) : 6;

    return {
      dogs: Dogs.find(selector, {sort: sort, limit: limit}).fetch()
    }
  },

  getInitialState() {
      return {
          dogColor: "red"
      };
  },

  getDefaultProps: function() {
    return {

    };
  },

  componentDidMount(){
    $('.ui.modal')
      .modal()
    ;
  },

  componentDidUpdate() {
    // $('.ui.modal')
    //   .modal('show')
    // ;
  },

  changeSortType: function(event){
    var sortType = ReactDOM.findDOMNode(this.refs.sortType).value.trim();

    Session.set('sortType', sortType);

    FlowRouter.go(FlowRouter.path('dogList', {sortType: sortType}));
  },

  // componentDidMount() {},

  // componentWillReceiveProps() {},
  // shouldComponentUpdate() {},
  // componentWillUpdate() {},
  // componentDidUpdate() {},

  // componentWillUnmount() {},

  render(){
    return (
      <div>

        <p>
          排序 
          <select ref="sortType" onChange={this.changeSortType}>
            <option value="nickName">昵称</option>
            <option value="age">年龄</option>
          </select>
        </p>
        {this.data.dogs.length>0 ? 
        <div className="ui cards">
        {this.data.dogs.map(function(dog){
          return <DogOfList key={dog._id} dogData={dog} />;
        })}
        </div> : 
        <div className="ui warning message">
          <i className="close icon"></i>
          <div className="header">
            暂时没有关注的人
          </div>
          请在“寻狗”界面里关注感兴趣的人
        </div>
        }
        <div className="ui modal">
          <i className="close icon"></i>
          <div className="header">
            Modal Title
          </div>
          <div className="image content">
            <div className="image">
              An image can appear on left or an icon
            </div>
            <div className="description">
              A description can appear on the right
            </div>
          </div>
          <div className="actions">
            <div className="ui button">Cancel</div>
            <div className="ui button">OK</div>
          </div>
        </div>
      </div>
    )
  }
});




/**
* 列表元素
*/
DogOfList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {

    }
  },

  getInitialState() {
      return {

      };
  },

  getDefaultProps: function() {
    return {

    };
  },

  follow: function(event){
    checkHasProfile();

    var currentFollowers = Dogs.findOne({_id: this.props.dogData._id}).followers;

    var dogId = Dogs.findOne({userId: Meteor.userId()})._id;

    if(!_.contains(currentFollowers, dogId)){
      // 是 dog 的 _id
      currentFollowers.push(dogId);

      Meteor.call('updateDog', this.props.dogData._id, {followers: currentFollowers}, function(error, result){
        console.log("关注成功");
      });

      // 修改自己的关注列表（我的关注）？ 或者从所有活动和狗窝中找 id？
    }else{
      console.log("你已经关注过TA了");
    }
    
  },

  chat: function(event){

  },

  // removeDog: function(event){
  //   Dogs.remove(this.props.data._id);
  // },


  render(){
    followersList = (this.props.dogData.followers.length > 0) ? Dogs.find({_id: {$in: this.props.dogData.followers}}).fetch() : [];
    return (
      <div className="card">
        <div className="image">
          <img src={"/images/" + this.props.dogData.avatar} />
        </div>
        <div className="content">
          <a className="header" href={"/dogDetail/" + this.props.dogData._id}>{this.props.dogData.nickName}</a>
          <button className="tiny ui red button right floated" onClick={this.follow}><i className="heart icon" />关注TA</button>
          <div className="meta">
            <span>{this.props.dogData.age} 岁, {this.props.dogData.sex}</span>
          </div>
          <div className="description">
            <p>爱好：{this.props.dogData.like}</p>
          </div>
          <div className="extra">关注者：
            {followersList ? followersList.map(function(dog){
              return <DogAvatar key={dog._id} dogData={dog} />;
            }) : ''}
          </div>
        </div>
      </div>
    )
  }
});
