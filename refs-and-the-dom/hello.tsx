export default () => {
    console.log('hh');
    import('./dogs').then((fun: any) => fun());
     ;
}
