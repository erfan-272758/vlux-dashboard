import { FC } from "react";
import {
  Button,
  EditButtonProps,
  FieldProps,
  FunctionField,
  FunctionFieldProps,
  RaRecord,
  useNotify,
  useRecordContext,
} from "react-admin";
import ContentCopy from "@mui/icons-material/ContentCopy";

const ColorFullField: FC<
  FunctionFieldProps & {
    validate: (r: any) => boolean;
  }
> = ({ validate, ...props }) => {
  const record = useRecordContext(props);
  return (
    <FunctionField
      {...props}
      sx={{
        color: validate(record) ? undefined : "red",
      }}
    />
  );
};

export default ColorFullField;
