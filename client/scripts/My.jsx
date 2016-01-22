My = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {};
  },

  getInitialState() {
    return {};
  },

  getDefaultProps() {
    return {};
  },
  render() {
    return (
      <div className="ui relaxed divided list">
        <div className="item"><a className="header" href="/my/profile">个人资料</a></div>
        <div className="item"><a className="header" href="/my/follow">我的关注</a></div>
        <div className="item"><a className="header" href="/my/nest">我加入的狗窝</a></div>
        <div className="item"><a className="header" href="/my/event">我报名的活动</a></div>
      </div>
    )
  }
});