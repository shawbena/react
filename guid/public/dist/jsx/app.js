"use strict";

function getGreeting(user) {
    if (user) {
        return React.createElement(
            "h1",
            null,
            "Hello, ",
            formatName(user),
            "!"
        );
    }
    return React.createElement(
        "h1",
        null,
        "Hello, Stranger."
    );
}
function formatName() {}

React.createElement(
    MyButton,
    { color: "blue", shadowSize: 2 },
    "Click Me"
);

var div = React.createElement("div", { className: "sidebar" });