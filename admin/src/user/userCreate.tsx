import {
  BooleanInput,
  Create,
  DateInput,
  DateTimeInput,
  NumberInput,
  PasswordInput,
  ResourceProps,
  SimpleForm,
  TextInput,
} from "react-admin";

export const userCreate: ResourceProps["create"] = (props) => {
  return (
    <Create {...props} redirect={"list"}>
      <SimpleForm>
        <TextInput source="username" label="username" required />
        <PasswordInput
          source="password"
          type="password"
          label="password"
          required
        />
        <NumberInput source="max_traffic" label={"traffic"} defaultValue={0} />
        <DateTimeInput source="expire_at" label="expire at" />
        <TextInput source="contact" label="contact" defaultValue={""} />
        <BooleanInput source="is_active" label="active" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
};
export default userCreate;
