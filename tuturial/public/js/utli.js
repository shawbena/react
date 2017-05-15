//这里面的方法不应该有外部依赖

(function() {
    "use strict"

    const BASEURL = window.location.protocol + "//" + window.location.host;

    //encode(), decode(), _utf8_encode(), _utf8_decode()
    let Base64 = {
        "_keyStr": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        _utf8_encode: function(string) {
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
        _utf8_decode: function(utftext) {
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
        encode: function(input) {
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
        decode: function(input) {
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
    /*
     * md5
     * @return string
     */
    function md5(str) {

        let rotateLeft = function(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        let addUnsigned = function(lX, lY) {
            let lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            if (lX4 | lY4) {
                if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        let F = function(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        let G = function(x, y, z) {
            return (x & z) | (y & (~z));
        }

        let H = function(x, y, z) {
            return (x ^ y ^ z);
        }

        let I = function(x, y, z) {
            return (y ^ (x | (~z)));
        }

        let FF = function(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        let GG = function(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        let HH = function(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        let II = function(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };

        let convertToWordArray = function(string) {
            let lWordCount;
            let lMessageLength = string.length;
            let lNumberOfWordsTempOne = lMessageLength + 8;
            let lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
            let lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
            let lWordArray = Array(lNumberOfWords - 1);
            let lBytePosition = 0;
            let lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        let wordToHex = function(lValue) {
            let WordToHexValue = "",
                WordToHexValueTemp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValueTemp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
            }
            return WordToHexValue;
        };

        let uTF8Encode = function(string) {
            string = string.replace(/\x0d\x0a/g, "\x0a");
            let output = "";
            for (let n = 0; n < string.length; n++) {
                let c = string.charCodeAt(n);
                if (c < 128) {
                    output += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    output += String.fromCharCode((c >> 6) | 192);
                    output += String.fromCharCode((c & 63) | 128);
                } else {
                    output += String.fromCharCode((c >> 12) | 224);
                    output += String.fromCharCode(((c >> 6) & 63) | 128);
                    output += String.fromCharCode((c & 63) | 128);
                }
            }
            return output;
        };

        return (function(string) {
            let x = Array();
            let k, AA, BB, CC, DD, a, b, c, d;
            let S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            let S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            let S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            let S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            let tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        })(str);
    }
    //处理查询字符串，encode(), decode()
    /*
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
    let queryString = {
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
                return Object.keys(obj).map(function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    if (Array.isArray(obj[k])) {
                        return obj[k].map(function(v) {
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
        xhr.on('readystatechange', function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    processResult();
                }
            }
        });
        if(typeof options.progress == 'function'){
            xhr.upload.on('progress', options.progress);
        }
        xhr.on('load', function() {});
        xhr.on('error', function(err) {
            if (typeof error == 'function') {
                error(err);
            }
        });
        
        xhr.on('abort', function() {});
        xhr.on('timeout', function() {});

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
    /**
     * 获取对象的原始类型
     * @param
     * @return {String}
     * 没有什么用，将会被废弃
     */
    function getObjectType(obj) {
        let type = Object.prototype.toString.call(obj);
        return type.replace(/(^\[object\s)(\w+)(\]$)/, '$2');
    }

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

    function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    //抛异常
    function throwError(errMessage) {
        throw new Error(errMessage);
    }
    //是否是中文字符
    function isChineseChar(str) {
        return /^[\u4E00-\u9FA5\uF900-\uFA2D]*$/.test(str);
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

    //return random data, include end and start
    function randomData(start, end) {
        if (!(typeof start === 'number') && !(typeof end === 'number')) {
            console.log('unexpect params', start, end, 'params must be typeof number!');
            return null;
        }
        return Math.floor(Math.random() * (end - start + 1)) + start;
    }

    //数组去重, 汪修改原数组，返回去重后的新数组
    function removeRepeat(arr) {
        if (getObjectType(arr) != "Array") {
            throwError('参数不是数组：', +arr);
            return;
        }
        let newArr = [];
        arr.forEach(function(item) {
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
            node.forEach(function(item) {
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
    //删除值为空的属性，满足以下条件都会的属性都会被从对象中移除
    //'' null, undefined, []
    //返回删除为空属性后的对象
    function deleteEmptyProperty(obj) {
        let deleteArr = ['', null, undefined, []];
        for (let key in obj) {
            if (deleteArr.some(function(item) {
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

    let loading = {
        loadingComp: {},
        show(msg) {},
        hide() {
            if (this.loadingComp) {
                this.loadingComp.shown = false;
            }
        }
    };
    let Global = {
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
        loading
    };

    window.Utli = Global;
})();
