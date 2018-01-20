/* apps for compile
* apps array will be used to generate configurations, the total amount of configuration is *apps.length
* a app title, dir, entry for a single application (a single react demo here)
* dir and entry is used for resolve webpack entry, title is a application page title
* 
* app: string | Object, required
* app.dir: string, required
* app.title: string, optional, default is app.dir,
* app.entry: string | Array | [key:value] Object, required
* 
* string value of app means represents for a directory that there is a `index.js` as a direct child
* Object value of app means there are more than one entry.
* string value of app.entry means one entry: `app`.
* Array value of app.entry may be multiply entry, i don't know, please reference webpack configuration
* Object value of app.entry means there are at least one entry and must have an entry with a key `app`, if there is more than one key:value pair entry, there will be at least one directory named key's value directly in app.dir and at least a `index.js` in it.
*/
const apps = [{
   dir: 'rending-elements',    // String: required
   title: 'Rending Elements',  // String: optional
   //relative to app dir
   entry: {                     // entry: String | Array, key:value pairs; key:value pairs for mutiple entry points
	   app: 'index.js',
	   tickClock: 'tick-clock'
   },
}, 'state-and-lifecycle', {
   dir: 'handling-events',
   entry: {
	   app: '',
	   bind: 'bind'
   }
}, {
   dir: 'conditional-rendering',
   entry: {
	   app: '',
	   'loginControl': 'login-control',
	   'preventComponentFromRending': 'prevent-component-from-rending'
   },
}, {
    dir: 'jsx-in-depth',
    entry: {
        app: '',
        dotNotation: 'dot-notation',
        spreadAttributes: 'spread-attributes',
        pickProps: 'pick-props',
        javascriptExpressionAsChildren: 'javascript-expression-as-children'
    }
},{
   dir: 'list-and-keys',
   entry: {
	   app: '',
	   basicListComponent: 'basic-list-component'
   }}, {
       dir: 'forms',
       entry: {
           app: '',
           easyForm: 'easy-form',
           flavorForm: 'flavor-form',
           reservation: 'reservation',
           nullValue: 'null-value'
       }
   }, 'lifting-state-up'
];

module.exports = apps;