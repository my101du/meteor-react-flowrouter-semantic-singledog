Container = React.createClass({

	mixins: [ReactMeteorData],

  getMeteorData() {
    return {
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
			<div className="ui container">
        <Header />
        <div className="content">
  			{this.props.content}
        </div>
			</div>
		)
	}
});
