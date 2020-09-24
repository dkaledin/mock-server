export class IServerResponse<T> {
    data: T[];
    count: number;
    total: number;
    pageCount: number;
    page: number;
}
