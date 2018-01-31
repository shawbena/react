export interface DataSourceEventHandler{
    (): void;
}

export interface IDataSource {
    getBlogPost(id: string): string;
    getComments(): string[];
    addChangeListener(handler: DataSourceEventHandler): void;
    removeChangeListener(handler: DataSourceEventHandler): void;
}

let DataSource: IDataSource = {
    getBlogPost(id): string{
        return '';
    },
    getComments(): string[]{
        return [];
    },
    addChangeListener(handler){

    },
    removeChangeListener(handler){

    }
};

export default DataSource;