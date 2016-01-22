DogAvatar = React.createClass({


  render(){
    return (
      <span>
        <img className="ui avatar image" src={"/images/" + this.props.dogData.avatar} />
        <span>{this.props.dogData.nickName}</span>
      </span>
    );
  }
});