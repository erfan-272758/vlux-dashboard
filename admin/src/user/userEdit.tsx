import {
  Edit,
  TextInput,
  PasswordInput,
  BooleanInput,
  ResourceProps,
  SimpleForm,
  NumberInput,
  DateInput,
} from "react-admin";

export const userEdit: ResourceProps["edit"] = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <SimpleForm>
          <TextInput source="username" label="username" />
          <PasswordInput source="password" type="password" label="password" />
          <NumberInput source="max_traffic" label={"traffic"} />
          <DateInput source="expire_at" label="expire at" />
          <TextInput source="contact" label="contact" />
          <BooleanInput source="active" label="active" />
        </SimpleForm>
      </SimpleForm>
    </Edit>
  );
};

export default userEdit;
