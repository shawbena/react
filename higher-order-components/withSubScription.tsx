import * as React from 'react';
import DataSource, { IDataSource } from './DataSource';

interface SubscriptionState{
    data: any;
}

/**
 * 包裹后组件接收的属性。
 */
interface SubscriptionProps{
    [prop: string]: any;
}

/**
 * 对包裹组件属性的要求。
 */
interface ComponentProps extends SubscriptionProps{
    data: any;
}

export default function withSubscription(Component: React.ComponentType<ComponentProps>, selectData: (dataSource: IDataSource, props?: SubscriptionProps) => any){
    // SubScriptionComponent 与 Subscription 接收相同的属性
    return class Subscription extends React.Component<SubscriptionProps, SubscriptionState>{
        constructor(props: SubscriptionProps){
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
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
                data: selectData(DataSource, this.props)
            });
        }

        render(){
            // 。。。renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <Component data={this.state.data} {...this.props} />
        }
    }
}