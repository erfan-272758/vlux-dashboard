import {
  BooleanField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ResourceProps,
  List,
  NumberField,
  ShowButton,
  SearchInput,
  Filter,
  BooleanInput,
  DeleteButton,
  Button,
} from "react-admin";
import ContentCopy from "@mui/icons-material/ContentCopy";

import { ItemPagination } from "../UI/pagination";
import CopyBtn from "../UI/CopyBtn";
import DeleteWithConfirm from "../UI/DeleteWithConfirm";

// const exporter = (users: any) => {
//   jsonexport(
//     users,
//     {
//       headers: [
//         "id",
//         "username",
//         "password",
//         "max_traffic",
//         "used_traffic",
//         "expire_at",
//         "active",
//       ],
//     },
//     (err, csv) => {
//       const BOM = "\uFEFF";
//       downloadCSV(`${BOM} ${csv}`, "users"); // download as 'posts.csv` file
//     }
//   );
// };

export const userList: ResourceProps["list"] = (props) => {
  return (
    <List
      {...props}
      filters={[<BooleanInput source="in_active" label="active" key={"0"} />]}
      pagination={<ItemPagination />}
    >
      <Datagrid>
        <TextField source="username" label="username" />
        <NumberField source="max_traffic" label="max traffic" />
        <NumberField source="used_traffic" label="used" />
        <DateField source="expire_at" showTime label="expire at" />
        <BooleanField source="is_active" label="active" />
        <EditButton />
        <CopyBtn />
        <DeleteWithConfirm />
      </Datagrid>
    </List>
  );
};

export default userList;
