import { FC } from "react";
import {
  FunctionField,
  FunctionFieldProps,
  useRecordContext,
} from "react-admin";

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
