Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

// 根据需要可以放在客户端全局，也可以放在路由级，也可以放在路由的路径级（例如一个 post 的 Comments，路径为 /post/:_id）
Meteor.subscribe("users");

Meteor.startup(function() {
	ReactDOM.render(<Container />, document.getElementById("render-target"));
});