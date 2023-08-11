import { FC } from "react";
import {
  Button,
  DeleteButton,
  EditButtonProps,
  RaRecord,
  useNotify,
  useRecordContext,
} from "react-admin";

const DeleteWithConfirm: FC<EditButtonProps<RaRecord>> = (props) => {
  const record = useRecordContext(props);
  return (
    <DeleteButton
      mutationMode="pessimistic"
      confirmTitle={`Delete user ${record.username}`}
      //   confirmContent={``}
    />
  );
};

export default DeleteWithConfirm;
