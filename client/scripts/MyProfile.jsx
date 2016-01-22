MyProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {

    // const subHandles = [
    //   Meteor.subscribe("dogs")
    // ];

    // const subsReady = _.all(subHandles, function (handle) {
    //   return handle.ready();
    // });

    var currentDog = this.props.dogData || {
        userId: '',
        nickName: '',
        mobile: '',
        sex: '',
        age: '',
        job: '',
        like: '',
        figure: '',
        personality: '',
        followers: []
    };
    console.log(currentDog);
    
    return {
      //subsReady: subsReady,
      //currentDog: Dogs.findOne({userId: Meteor.userId()}) || {}
      currentDog: currentDog
    };
  },

  getInitialState() {
    return {
      mode: !this.props.dogData ? '添加' : '编辑'
    };
  },

  componentDidMount() {

  },

  getDefaultProps: function() {
    return {
    };
  },

  submitDog: function(event){
    event.preventDefault();
    var submitDogData = {
      nickName: ReactDOM.findDOMNode(this.refs.nickName).value.trim(),
      mobile: ReactDOM.findDOMNode(this.refs.mobile).value.trim(),
      sex: ReactDOM.findDOMNode(this.refs.sex).value.trim(),
      age: ReactDOM.findDOMNode(this.refs.age).value.trim(),
      job: ReactDOM.findDOMNode(this.refs.job).value.trim(),
      like: ReactDOM.findDOMNode(this.refs.like).value.trim(),
      figure: ReactDOM.findDOMNode(this.refs.figure).value.trim(),
      personality: ReactDOM.findDOMNode(this.refs.personality).value.trim()
    };

    // 如果当前用户没有提交“狗”的资料,则新增
    if(!this.data.currentDog._id) {
      Meteor.call("addDog", submitDogData, function(error, result){
        if(result.mobileExists){
          console.log("手机号码重复，请更换");
        }
      });
      
    } else {
      //扩展一个 userId 字段提交过去进行检查
      var modifiedDog = _.extend(submitDogData, {userId: Meteor.userId()});
      
      Meteor.call('updateDog', this.data.currentDog._id, modifiedDog, function(error, result){

      });
    }

    FlowRouter.go("/");
  },

  render(){
    var currentDog = this.data.currentDog;

    return (
      <div>
        <form className="ui form">
          <div className="header">{this.state.mode}</div>
          <div className="field"><label>昵称</label><input ref="nickName" type="text" size="20" defaultValue={currentDog.nickName} /></div>
          <div className="field"><label>手机</label><input ref="mobile" type="text" defaultValue={currentDog.mobile} /></div>
          <div className="field"><label>性别</label><input ref="sex" type="text" defaultValue={currentDog.sex} /></div>
          <div className="field"><label>年龄</label><input ref="age" type="text" defaultValue={currentDog.age} /></div>
          <div className="field"><label>职业</label><input ref="job" type="text" defaultValue={currentDog.job} /></div>
          <div className="field"><label>爱好</label><input ref="like" type="text" defaultValue={currentDog.like} /></div>
          <div className="field"><label>体型特征</label><input ref="figure" type="text" defaultValue={currentDog.figure} /></div>
          <div className="field"><label>性格特点</label><input ref="personality" type="text" defaultValue={currentDog.personality} /></div>
          <button className="ui red button" type="button" onClick={this.submitDog}>提交</button>
        </form>
      </div>
    )
  }
});