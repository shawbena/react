import * as React from 'react';
import TextBlock from './TextBlock';
import DataSource from './DataSource';

interface BlogPostProps{
    id: string;
}

interface BlogPostState{
    blogPost: string;
}

class BlogPost extends React.Component<BlogPostProps, BlogPostState>{
    constructor(props: BlogPostProps){
        super(props);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange(){
        this.setState({ blogPost: DataSource.getBlogPost(this.props.id)});
    }

    render(){
        return <TextBlock text={this.state.blogPost} />;
    }
}