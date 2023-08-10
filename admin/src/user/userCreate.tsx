import {
  Create,
  DateInput,
  NumberInput,
  PasswordInput,
  ResourceProps,
  SimpleForm,
  TextInput,
} from "react-admin";

export const userCreate: ResourceProps["create"] = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="username" label="username" required />
        <PasswordInput
          source="password"
          type="password"
          label="password"
          required
        />
        <NumberInput source="max_traffic" label={"traffic"} />
        <DateInput source="expire_at" label="expire at" />
        <TextInput source="contact" label="contact" />
      </SimpleForm>
    </Create>
  );
};
export default userCreate;
