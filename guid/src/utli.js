import React from 'react';
import ReactDOM from 'react-dom';

/*
    @params
    data: {
        method:         <String>, 默认 get
        url:            <String>, 
        data:           <Object>
        async:          <Boolean>
        responseType:   <xhr.responseType> 默认 '', 值可以为 '', 'json', 'arraybuffer', 'blob', 'text', 'document'
        user, 
        password,
        headers:        <Object>, <header, value> pairs
            {
                Content-Type: 'application/json'
            }
        timeout:        <Number>
        timeoutFn:      <Function>
        withCredentials: <Boolean>,
        abort:          <function>
    }
    success: a function will be called if response is suit for you
    error: a function will be called when error happens
    @return xhr <XMLHttpRequest>
    要终止请求，调用 xhr.abort()
    注：同步ajax目前不支持
*/
function ajax(options, success, error, complete) {
    let ajaxMethods = ['get', 'post', 'put', 'delete']; //请求方式可能是任意合法字符串
    let xhr;
    if (typeof options.url != 'string') {
        throwError('url 不存在或不是字符串！');
    }
    if (!options.method) {
        options.method = 'get';
    }
    if (!options.headers || typeof options.headers != 'object') {
        options.headers = {};
    }
    //get 请求, data 转换为 url 片段, 如果 options.url 中有查询字符串则会被保留
    //其他请求方法会把 options.url 中的查询字符串丢掉
    if (options.method == 'get') {
        let url = options.url.split('?')[0];
        let urlQueryString = options.url.split('?')[1];
        let urlComponent = '';

        urlComponent += queryString.encode(queryString.decode(urlQueryString));
        if (typeof options.data == 'object') {
            urlComponent = queryString.encode(data)
        }

        options.url = url;
        if (urlComponent && typeof urlComponent == 'string') {
            options.url += '?' + urlComponent;
        }
    } else {
        options.url = options.url.split('?')[0];
    }

    xhr = new XMLHttpRequest();
    xhr.on = xhr.addEventListener;
    if (typeof options.responseType == 'string') {
        xhr.responseType = options.responseType;
    } else {
        options.responseType = 'json';
        xhr.responseType = 'json';
    }
    xhr.open(options.method, options.url, options.async || true, options.user || undefined, options.password || undefined);
    //设置请求头
    //非 get 请求，默认 applicatin/json
    if (options.method != 'get' && !options.headers['Content-Type']) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        options.data = JSON.stringify(options.data);
    }
    if (typeof options.headers == 'object') {
        for (let key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
    }
    xhr.on('readystatechange', function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                processResult();
            }
        }
    });
    if (typeof options.progress == 'function') {
        xhr.upload.on('progress', options.progress);
    }
    xhr.on('load', function () { });
    xhr.on('error', function (err) {
        if (typeof error == 'function') {
            error(err);
        }
    });

    xhr.on('abort', function () { });
    xhr.on('timeout', function () { });

    xhr.send(options.data || undefined);

    //处理响应原始数据
    function processResult() {
        if (typeof success != 'function') {
            throwError('成功回调不存在或者不是函数');
        }
        let res;
        if (xhr.responseType == '' || xhr.responseType == 'text') {
            res = JSON.parse(res.response);
        } else {
            res = xhr.response;
        }
        success(res);
    }
    return xhr;
}
function xhr() {
    if (!XMLHttpRequest) {
        throwError('您的浏览器不支持 ajax!');
    }
    return new XMLHttpRequest();
}
//encode(), decode(), _utf8_encode(), _utf8_decode()
let Base64 = {
    "_keyStr": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128)
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128)
            }
        }
        return utftext
    },
    _utf8_decode: function (utftext) {
        let string = "";
        let i = 0;
        let c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3
            }
        }
        return string
    },
    encode: function (input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
        }
        return output
    },
    decode: function (input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3)
            }
        }
        output = this._utf8_decode(output);
        return output
    }
};

//删除值为空的属性，满足以下条件都会的属性都会被从对象中移除
//'' null, undefined, []
//返回删除为空属性后的对象
function deleteEmptyProperty(obj) {
    let deleteArr = ['', null, undefined, []];
    for (let key in obj) {
        if (deleteArr.some(function (item) {
            return obj[key] === item || isEmptypArr(obj[key]);
        })) {
            delete obj[key];
        }
    }
    return obj;

    function isEmptypArr(arr) {
        return arr instanceof Array && arr.length === 0;
    }
}
//格式化日期
function formatDate(date = new Date(), format = '-') {
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate();

    let dateStr = `${year}${format}${month}${format}${day}`;
    return dateStr;
}
//格式化时间
function formatTime(date = new Date(), format = ':') {
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    let timeStr = `${hour}${format}${minute}${format}${second}`
    return timeStr;
}
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
//是否是中文字符
function isChineseChar(str) {
    return /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/.test(str);
}
function popo(title) {
    let TipPop = function (props) {
        return <div className="popo">{props.message}</div>;
    }
    ReactDOM.render(
        <TipPop message={title} />,
        document.getElementById('pop')
    );
}
let queryString = {
    /*
    处理查询字符串，encode(), decode()
    encode(obj, name, sep, eq)
    将对象解析为 encodeURIComponent() 编码的字符串，object 是必须的。
    如果有 name, obj 应该为 <String> 类型。
    如果 obj 中属性值为数组：
        obj{
            name: ['xiaoming', 'xiaoqiang']
        }
    解析结果为：
        name=xiaoming&name=xiaoqiang

    */
    decode(qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};

        if (typeof qs !== 'string' || qs.length === 0) {
            return obj;
        }

        var regexp = /\+/g;
        qs = qs.split(sep);

        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
            maxKeys = options.maxKeys;
        }

        var len = qs.length;
        // maxKeys <= 0 means that we should not limit keys count
        if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
        }

        for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp, '%20'),
                idx = x.indexOf(eq),
                kstr, vstr, k, v;

            if (idx >= 0) {
                kstr = x.substr(0, idx);
                vstr = x.substr(idx + 1);
            } else {
                kstr = x;
                vstr = '';
            }

            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);

            if (!hasOwnProperty(obj, k)) {
                obj[k] = v;
            } else if (Array.isArray(obj[k])) {
                obj[k].push(v);
            } else {
                obj[k] = [obj[k], v];
            }
        }

        return obj;
    },
    encode(obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
            obj = undefined;
        }

        if (typeof obj === 'object') {
            return Object.keys(obj).map(function (k) {
                var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                if (Array.isArray(obj[k])) {
                    return obj[k].map(function (v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v));
                    }).join(sep);
                } else {
                    return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                }
            }).join(sep);

        }

        if (!name) return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq +
            encodeURIComponent(stringifyPrimitive(obj));
    }
};
//return random data, include end and start
function randomData(start, end) {
    if (!(typeof start === 'number') && !(typeof end === 'number')) {
        console.log('unexpect params', start, end, 'params must be typeof number!');
        return null;
    }
    return Math.floor(Math.random() * (end - start + 1)) + start;
}
/**
 * 字符串化输入
 * @param {any} v
 * @returns <String>
 */
function stringifyPrimitive(v) {
    switch (typeof v) {
        case 'string':
            return v;
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return isFinite(v) ? v.toString() : '';
        default:
            return '';
    }
};
//抛异常
function throwError(errMessage) {
    throw new Error(errMessage);
}

//数组去重, 汪修改原数组，返回去重后的新数组
function removeRepeat(arr) {
    if (getObjectType(arr) != "Array") {
        throwError('参数不是数组：', +arr);
        return;
    }
    let newArr = [];
    arr.forEach(function (item) {
        if (!(newArr.indexOf(item) > -1)) {
            newArr.push(item);
        }
    });

    return newArr;
}
/*
 *  将树结构数据处理成数组类型
 *  递归，树不能太深，否则会很慢
 *  node: Array | Object
 *  propertyHasChild: String， 有子节点的属性
 *  返回值：Array
 */
function treeDataToArray(node, propertyHasChild) {
    let result = [];
    if (node instanceof Array) {
        node.forEach(function (item) {
            fun(item, propertyHasChild);
        });
    } else {
        fun(node, propertyHasChild);
    }
    return result;

    function fun(node, propertyHasChild) {
        let obj = {};
        for (let key in node) {
            if (key == propertyHasChild) {
                obj['childCount'] = node[key].length && node[key] instanceof Array ? node[key].length : 0;
                continue;
            }
            obj[key] = node[key];
        }
        result.push(obj);
        //如果有子节点
        if (node[propertyHasChild] && node[propertyHasChild] instanceof Array && node[propertyHasChild].length) {
            for (let i = 0; i < node[propertyHasChild].length; i++) {
                fun(node[propertyHasChild][i], propertyHasChild);
            }
        }
    }
}

let loading = {
    loadingComp: {},
    show(msg) { },
    hide() {
        if (this.loadingComp) {
            this.loadingComp.shown = false;
        }
    }
};
let Utli = {
    BASEURL,
    ajax,
    xhr,
    throwError,
    isChineseChar,
    formatDate,
    formatTime,
    randomData,
    removeRepeat,
    stringifyPrimitive,
    loading,
    popo
};

export default Utli;