import React from '../react';

export default class NewsFeed extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let props = this.props;
        return (
            <div className="news-feed">News Feed</div>
        );
    }
}