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
} from "react-admin";
import { ItemPagination } from "../UI/pagination";

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
    <List {...props} pagination={<ItemPagination />}>
      <Datagrid>
        <TextField source="username" label="username" />
        <NumberField source="max_traffic" label="max traffic" />
        <NumberField source="used_traffic" label="used" />
        <DateField source="expire_at" showTime label="expire at" />
        <BooleanField source="is_active" label="active" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default userList;
