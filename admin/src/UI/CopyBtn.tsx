import { FC } from "react";
import {
  Button,
  EditButtonProps,
  RaRecord,
  useNotify,
  useRecordContext,
} from "react-admin";
import ContentCopy from "@mui/icons-material/ContentCopy";

const CopyBtn: FC<EditButtonProps<RaRecord>> = (props) => {
  const notify = useNotify();
  const record = useRecordContext(props);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(
          `host: \`${record.host ?? process.env.SERVER_HOST}\`
port: \`${record.port ?? process.env.SERVER_PORT ?? 31000}\`
username: \`${record.username}\`
password: \`${record.password}\``
          // `ssh://${record.username}:${encodeURIComponent(record.password)}@${
          //   record.host ?? process.env.SERVER_HOST
          // }:${record.port ?? process.env.SERVER_PORT ?? 22}#SSH`
        );
        notify("copy successfully", { type: "success" });
      }}
    >
      <ContentCopy />
    </Button>
  );
};

export default CopyBtn;
