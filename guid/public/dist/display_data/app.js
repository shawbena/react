define([], function () {
    "use strict";

    var HelloWorld = React.createClass({
        displayName: "HelloWorld",

        render: function render() {
            return React.createElement(
                "p",
                null,
                "Hello,",
                React.createElement("input", { type: "text", placeholder: "Your name here" }),
                "It is ",
                this.props.date.toTimeString(),
                "\u3002"
            );
        }
    });
    setInterval(function () {
        ReactDOM.render(React.createElement(HelloWorld, { date: new Date() }), document.getElementById('example'));
    }, 500);

    var myDivElement = React.createElement("div", { className: "foo" });
    ReactDOM.render(myDivElement, document.getElementById('example_jsx_1'));

    var MyComponent = React.createClass({
        displayName: "MyComponent",
        render: function render() {
            return React.createElement(
                "div",
                null,
                "my element"
            );
        }
    });
    var myElement = React.createElement(MyComponent, { someProperty: true });
    ReactDOM.render(myElement, document.getElementById('example_jsx_2'));

    var Nav = 'div',
        Profile = 'p';
    var app = React.createElement(Nav, { color: "blue" });
    app = React.createElement(Nav, { color: "blue" });

    app = React.createElement(
        Nav,
        null,
        React.createElement(
            Profile,
            null,
            "click"
        )
    );
    app = React.createElement(Nav, {
        color: "blue"
    }, React.createElement(Profile, null, "click"));

    var MyFormComponent = React.createClass({
        displayName: "MyFormComponent",
        render: function render() {
            return React.createElement("div", { className: "form" });
        }
    });
    MyFormComponent.Row = React.createClass({
        displayName: "Row",
        render: function render() {
            return React.createElement("div", { "class": "form-row" });
        }
    });
    MyFormComponent.Label = React.createClass({
        displayName: "Label",
        render: function render() {
            return React.createElement("div", { "class": "form-label" });
        }
    });
    MyFormComponent.Input = React.createClass({
        displayName: "Input",
        render: function render() {
            return React.createElement("div", { "class": "form-Input" });
        }
    });
    var Form = MyFormComponent;
    app = React.createElement(
        Form,
        null,
        React.createElement(
            Form.Row,
            null,
            React.createElement(Form.Label, null),
            React.createElement(Form.Input, null)
        )
    );

    var content = React.createElement(
        Nav,
        null,
        React.createElement(Person, {
            name: window.isLoggedIn ? window.name : '' })
    );
});