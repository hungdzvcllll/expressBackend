import TableOrder from "./TableOrder";
export declare class Table {
    id: number;
    capacity: number;
    status: boolean;
    tableOrder: TableOrder[];
    constructor(capacity: number, status: boolean, tableOrder: TableOrder[]);
}
export default Table;
