import * as React from 'react';
import Comment from './Comment';
import DataSource from './DataSource';

interface CommentListProps {

}

interface CommentListState {
    comments: string[];
}

class CommentList extends React.Component<CommentListProps, CommentListState>{
    constructor(props: CommentListProps){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            comments: DataSource.getComments()
        };
    }

    componentDidMount(){
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount(){
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange(){
        this.setState({
            comments: DataSource.getComments()
        })
    }

    render(){
        return(
            <div>
                {this.state.comments.map((comment, index) =>(
                    <Comment comment={comment} key={index} />
                ))}
            </div>
        );
    }
}
