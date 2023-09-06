import {
  Edit,
  TextInput,
  PasswordInput,
  BooleanInput,
  ResourceProps,
  SimpleForm,
  NumberInput,
  DateInput,
  DateTimeInput,
} from "react-admin";

export const userEdit: ResourceProps["edit"] = (props) => {
  return (
    <Edit {...props} mutationMode="pessimistic">
      <SimpleForm>
        <TextInput source="username" label="username" />
        <PasswordInput source="password" label="password" />
        <NumberInput source="max_traffic" label={"traffic"} />
        <NumberInput source="download" label="download" disabled />
        <NumberInput source="upload" label="upload" disabled />
        <DateTimeInput source="expire_at" label="expire at" />
        <TextInput source="contact" label="contact" />
        <BooleanInput source="is_active" label="active" />
      </SimpleForm>
    </Edit>
  );
};

export default userEdit;
