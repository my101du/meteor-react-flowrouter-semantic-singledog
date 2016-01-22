EventList = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var selector = {};
    // console.log(this.props.eventIds);
    if(this.props.eventIds ){
      selector = {_id: {$in: this.props.eventIds}};
    }

    return {
      events: Events.find(selector).fetch()
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
      {this.data.events.length>0 ? 
        <div>
        {this.data.events.map(function(event){
          return <EventOfList key={event._id} eventData={event} />;
        })}
        </div> :
        <div className="ui warning message">
          <i className="close icon"></i>
          <div className="header">
            暂时没有报名任何活动
          </div>
          请在“活动”界面里报名
        </div>
      }
      </div>

    )
  }
});



/**
* 元素
*/
EventOfList = React.createClass({
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

  apply: function(event){
    checkHasProfile();

    var currentApplicants = Events.findOne({_id: this.props.eventData._id}).applicants;

    var dogId = Dogs.findOne({userId: Meteor.userId()})._id;

    if(!_.contains(currentApplicants, dogId)){
      // 是 dog 的 _id
      currentApplicants.push(dogId);

      Meteor.call('updateEvent', this.props.eventData._id, {applicants: currentApplicants}, function(error, result){
        console.log("报名成功");
      });
    }else{
      console.log("你已经报名过这个活动了");
    }
    
  },

  render() {
    var dogIds = this.props.eventData.applicants;
    dogsList = Dogs.find({_id: {$in: dogIds}}).fetch();
    return(
      <div className="item">
        <div className="content">
          <div className="ui red header">{this.props.eventData.name}</div>
          <a className="tiny ui red button right floated" onClick={this.apply}>报名</a>
          <div className="description">{this.props.eventData.desc}</div>
          <div className="extra">已报名：
            {dogsList.map(function(dog){
              return <DogAvatar key={dog._id} dogData={dog} />;
            })}
          </div>
        </div>
      </div>
    )
  }
});
