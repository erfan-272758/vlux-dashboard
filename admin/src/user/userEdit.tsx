import {
  Edit,
  TextInput,
  PasswordInput,
  BooleanInput,
  ResourceProps,
  SimpleForm,
  NumberInput,
  DateInput,
  NumberField,
  TextField,
} from "react-admin";

export const userEdit: ResourceProps["edit"] = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="username" label="username" />
        <PasswordInput source="password" type="password" label="password" />
        <NumberInput source="max_traffic" label={"traffic"} />
        <NumberInput source="used_traffic" label="used" disabled />
        <DateInput source="expire_at" label="expire at" />
        <TextInput source="contact" label="contact" />
        <BooleanInput source="is_active" label="active" />
      </SimpleForm>
    </Edit>
  );
};

export default userEdit;
