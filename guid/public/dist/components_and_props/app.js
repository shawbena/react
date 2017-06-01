"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Welcome(props) {
    return React.createElement(
        "h1",
        null,
        "Hello, ",
        props.name
    );
}

var Welcome2 = function (_React$Component) {
    _inherits(Welcome2, _React$Component);

    function Welcome2() {
        _classCallCheck(this, Welcome2);

        return _possibleConstructorReturn(this, (Welcome2.__proto__ || Object.getPrototypeOf(Welcome2)).apply(this, arguments));
    }

    _createClass(Welcome2, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "h1",
                null,
                "Hello, ",
                this.props.name
            );
        }
    }]);

    return Welcome2;
}(React.Component);

var element = React.createElement("div", null);

var element2 = React.createElement(Welcome, { name: "Sara" });

ReactDOM.render(element2, document.getElementById('root'));

function App() {
    return React.createElement(
        "div",
        null,
        React.createElement(Welcome, { name: "Sara" }),
        React.createElement(Welcome, { name: "Cahai" }),
        React.createElement(Welcome, { name: "Edite" })
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root2'));

function Comment(props) {
    return React.createElement(
        "div",
        { className: "comment" },
        React.createElement(UserInfo, { user: props.author }),
        React.createElement(
            "div",
            { className: "comment-text" },
            props.text
        ),
        React.createElement(
            "div",
            { className: "comment-date" },
            Utli.formatDate(props.date)
        )
    );
}

function Avata(props) {
    return React.createElement("img", { className: "avatar", src: props.user.avatarUrl, alt: props.user.name });
}

function UserInfo(props) {
    return React.createElement(
        "div",
        { className: "user-info" },
        React.createElement(Avata, { user: props.user }),
        React.createElement(
            "div",
            { className: "user-info-name" },
            props.user.name
        )
    );
}


var author = {
    name: 'jessi',
    avatarUrl: 'https:/images/jessi.png',
    text: 'sdfsdf',
    date: new Date()
};
ReactDOM.render(React.createElement(Comment, { author: author, text: author.text, date: author.date }), document.getElementById('root3'));