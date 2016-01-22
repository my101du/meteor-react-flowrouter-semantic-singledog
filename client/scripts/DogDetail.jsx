DogDetail = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    var dogDetail = Dogs.findOne({_id: this.props.dogId}) || {};

    return {
      //dogDetail: Dogs.findOne({_id: 'tNS9rFdWWyavfcGrZ'})
      dogDetail: dogDetail
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

  render(){
    // 问题：这里会重复读取一次，第二次读不到数据

    return (
      <div className="ui center aligned image header">
        <img src={"/images/" + this.data.dogDetail.avatar} className="ui circular image" />
        <h2>{this.data.dogDetail.nickName}</h2>
        <div className="content">
          <div className="meta">
            <span>{this.data.dogDetail.age} 岁, {this.data.dogDetail.sex}</span>
          </div>
          <div className="description">
            爱好：{this.data.dogDetail.like}
          </div>
        </div>
      </div>
    )
  }
});

