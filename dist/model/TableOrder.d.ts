import User from "./User";
import Table from "./Table";
export declare class TableOrder {
    id: number;
    start: Date;
    end: Date;
    status: boolean;
    user: User;
    table: Table;
    constructor(start: Date, end: Date, user: User, table: Table, status: boolean);
}
export default TableOrder;
