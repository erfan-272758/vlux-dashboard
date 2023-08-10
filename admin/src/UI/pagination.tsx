import { Pagination, PaginationProps } from "react-admin";

export const ItemPagination = (props: PaginationProps) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);
