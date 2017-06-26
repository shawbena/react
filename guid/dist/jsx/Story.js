define(['exports', '../react', './Stories'], function (exports, _react, _Stories) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var components = {
        photo: _Stories.PhotoStory,
        video: _Stories.VideoStory
    };

    function Story(props) {
        var SpecificStory = components[props.storyType];
        return _react2.default.createElement(SpecificStory, { story: props.story });
    }

    exports.default = Story;
});