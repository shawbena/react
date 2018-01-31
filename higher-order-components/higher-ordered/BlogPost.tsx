import * as React from 'react';
import withSubScription from '../withSubScription';
import TextBlock from '../TextBlock';
import withSubscription from '../withSubScription';

interface BlogPostProps{
    id: string;
    data: string;
}

function BlogPost(props: BlogPostProps){
    return <TextBlock text={props.data} />;
}

let BlogPostWithSubscription = withSubscription(BlogPost, (dataSource, props) => dataSource.getBlogPost((props as BlogPostProps).id));