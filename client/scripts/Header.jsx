Header = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      submitPath: FlowRouter.path("submitFormRouter", {}, {time: new Date()}),
      currentUser: Meteor.user()
    }
  },

  getInitialState() {
      return {
          value: null
      };
  },

  componentDidMount() {},
  componentDidUpdate() {},

  render(){
    return (
      <div className="ui red top fixed menu divider">
        <h3 className="blue text item top align"><i className="big red heterosexual icon" />单身狗配对</h3>

        <a className="item active" href="/"><i className="female icon"></i>寻狗</a>
        <a className="item" href="/nestList"><i className="users icon"></i>狗窝</a>
        <a className="item" href="/eventList"><i className="calendar icon"></i>活动</a>
        <a className="item" href="/my"><i className="user icon"></i>我的</a>
        <a className="item"><AccountsUIWrapper /> </a>
        <div className="right item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>
        </div>
      </div>
    )
  }
});


