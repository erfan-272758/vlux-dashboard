import {
  BooleanField,
  Datagrid,
  TextField,
  EditButton,
  ResourceProps,
  List,
  BooleanInput,
  FunctionField,
  TextInput,
} from "react-admin";

import { ItemPagination } from "../UI/pagination";
import CopyBtn from "../UI/CopyBtn";
import DeleteWithConfirm from "../UI/DeleteWithConfirm";
import ColorFullField from "../UI/ColorFullField";

export const userList: ResourceProps["list"] = (props) => {
  return (
    <List
      {...props}
      filters={[
        <BooleanInput source="is_active" label="active" key={"0"} />,
        <TextInput source="q" label="username" key="1" />,
      ]}
      pagination={<ItemPagination />}
    >
      <Datagrid>
        <TextField source="username" label="username" />
        <ColorFullField
          label="traffic"
          render={(record: any) => {
            return `${record.upload} / ${record.download}`;
          }}
          validate={(r) => {
            const max_traffic: number = r.max_traffic;
            const download: number = r.download;
            const upload: number = r.upload;
            const used = download + upload;
            return !max_traffic || max_traffic > used;
          }}
        />
        <ColorFullField
          label="max traffic"
          render={(record: any) => {
            let max_traffic: string | number = record.max_traffic;
            if (max_traffic === 0) max_traffic = "unlimited";
            return `${max_traffic}`;
          }}
          validate={(r) => true}
        />
        <ColorFullField
          label="expire at"
          render={(resource: any) => {
            const d = new Date(resource.expire_at);
            if (d.getTime() <= 0) return "unlimited";
            return d.toLocaleString();
          }}
          validate={(r) => {
            const d = new Date(r.expire_at);
            return d.getTime() <= 0 || d.getTime() > Date.now();
          }}
        />
        <BooleanField
          source="is_active"
          label="active"
          valueLabelFalse="inactive"
          valueLabelTrue="active"
        />
        <EditButton />
        <CopyBtn />
        <DeleteWithConfirm />
      </Datagrid>
    </List>
  );
};

export default userList;
