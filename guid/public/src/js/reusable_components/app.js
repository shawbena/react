/* 属性验证
*/
React.createClass({
    propTypes: {
        //属性是 JS 原始类型
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,
        optionalSymbol: React.PropTypes.optionalSymbol,

        optionalNode: React.PropTypes.node,
        //一个 React element
        optionalElement: React.PropTypes.element,
        //某个类的实例
        optionalMessage: React.PropTypes.instanceOf(Message),
        //把其当作枚举，限于特定的值
        optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

        //一个对象可以是很多类型中的一个
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Message)
        ]),
        //一个某个类型的数组
        optionalArrayOf: React.PropTypes.arrayOf(React.ProTypes.number),
        //对象的属性可以是某个类型
        optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
        //an object taking on a prticular shape
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),

        //以上都可以跟 isRequired，如果没有提供这个属性就发出警告
        requiredFunc: React.PropTypes.func.isRequired,

        //任何数据类型
        requiredAny: React.PropTypes.any.isRequired,

        //自定义验证器，如果验证失败，应该返回一个 Error 对象。不要 console.warn 或 throw, 因为这在 oneOfType 中不起作用。
        customProp: function (props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' + ' `' + componentName +
                    '`. Validation failed'
                );
            }
        },
        //你也可以给 arrayOf 和 objectOf 提供自定义的验证器。如果验证失败应该返回一个 Error 对象。The validator
        // will be called for each key in the array or object. The first two
        // arguments of the validator are the array or object itself, and the
        // current item's key.
        customArrayProp: React.PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
            if (!/matchme/.test(propValue[key])) {
                return new Error(
                    'Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.'
                );
            }
        })
    }
});

/* Single Child
 With React.PropTypes.element you can specify that only a single child can be passed to a component as children. //?
*/
let MyComponent = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired
    },
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
});