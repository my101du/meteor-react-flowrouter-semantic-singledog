NestList = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var selector = {};

    if(this.props.nestIds){
      selector = {_id: {$in: this.props.nestIds}};
    }

    return {
      nests: Nests.find(selector).fetch()
    };
  },

  getInitialState() {
    return {};
  },

  getDefaultProps: function() {
    return {

    };
  },


  render(){
    return (
      <div className="ui divided items">
      {this.data.nests.length>0 ?
        <div>
        {this.data.nests.map(function(nest){
          return <NestOfList key={nest._id} nestData={nest} />;
        })}
        </div> : 
        <div className="ui warning message">
          <i className="close icon"></i>
          <div className="header">
            暂时没有加入任何狗窝
          </div>
          请在“狗窝”界面里加入感兴趣的
        </div>
      }
      </div>
    )
  }
});



/**
* 元素
*/
NestOfList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {

    }
  },

  getInitialState() {
      return { };
  },

  getDefaultProps: function() {
    return {

    };
  },

  join: function(event){
    checkHasProfile();
    var currentUsers = Nests.findOne({_id: this.props.nestData._id}).users;

    var dogId = Dogs.findOne({userId: Meteor.userId()})._id;

    if(!_.contains(currentUsers, dogId)){
      // 是 dog 的 _id
      currentUsers.push(dogId);

      Meteor.call('updateNest', this.props.nestData._id, {users: currentUsers}, function(error, result){
        console.log("加入成功");
      });
    }else{
      console.log("你已经加入过这个狗窝了");
    }
    
  },

  render() {
    var dogIds = this.props.nestData.users;
    dogsList = Dogs.find({_id: {$in: dogIds}}).fetch();
    //console.log(dogsList);
    return(
      <div className="item">
        <div className="content">
          <div className="ui red header">{this.props.nestData.name}</div>
          <a className="tiny ui red button right floated" onClick={this.join}><i className="add icon"></i>加入</a>
          <div className="description">{this.props.nestData.desc}</div>
          <div className="extra">成员：
            {dogsList.map(function(dog){
              return <DogAvatar key={dog._id} dogData={dog} />;
            })}
          </div>
        </div>
      </div>
    )
  }
});
