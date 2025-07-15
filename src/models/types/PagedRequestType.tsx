export interface PagedRequestType{
    pageIndex: number,
    pageSize: number,
    columnNameForSorting: string,
    sortDirection: string,
    searchBy: string,
    searchValue: string
}