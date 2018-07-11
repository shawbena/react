/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference path="../node_modules/@types/react/index.d.ts" />
declare module 'hot-new-module'
declare module "bootstrap"{
    export default function bootstrap<P={}>(App:React.ReactType<P>, props?:P, container?: Element): void;
}

declare module "*!text" {
    const content: string;
    export default content;
}
// Some do it the other way around.
declare module "json!*" {
    const value: any;
    export default value;
}

declare module "Promise" {
    const value: any;
    export default value;
}