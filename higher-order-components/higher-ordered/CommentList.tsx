import * as React from 'react';
import withSubScription from '../withSubScription';
import Comment from '../Comment';

interface CommentListProps {
    data: string[];
}

interface CommentListState {
    comments: string[];
}

class CommentList extends React.Component<CommentListProps, CommentListState>{
    render(){
        return(
            <div>
                {this.props.data.map((comment, index) =>(
                    <Comment comment={comment} key={index} />
                ))}
            </div>
        );
    }
}

let CommentListWithSubScription = withSubScription(CommentList, (dataSource) => dataSource.getComments());

let c = <CommentListWithSubScription />;
export default CommentListWithSubScription;