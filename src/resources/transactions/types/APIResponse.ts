import { APITransaction } from './APITransaction';

export type APIResponse = {
    items: APITransaction[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    }
}
