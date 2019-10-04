import { MatPaginatorIntl } from "@angular/material";

export interface IPaging<T> {
    page: number;
    size: number;
    total: number;
    items: T[];
}

export interface IPagingInfo {
    page: number;
    size: number;
    total: number;
    pageSizeOptions?: number[];
}

export interface ServiceResult {
    isSuccess: boolean;
    errors: string[];
}


export function getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = "Số dòng trên trang";
    paginatorIntl.getRangeLabel = (page, pageSize, length) => {
        var to = Math.min((page + 1) * pageSize, length);
        var from = Math.min((page) * pageSize + 1, length);
        return `${from} ~ ${to} trong số ${length}`;
    };
    return paginatorIntl;
}
