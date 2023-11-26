import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  emailValidationOptions,
  passwordValidationOptions,
} from "services/UseFormValidators";

const EMAIL_INPUT_ID = "emailInput";
const PASSWORD_INPUT_ID = "passwordInput";

export interface LoginProps {
  handleLogin: (email: string, password: string) => void;
}

export default function Login(props: LoginProps) {
  const methods = useForm();
  function onSubmit(data: FieldValues, errors: FieldErrors<FieldValues>): void {
    console.log(data);
  }
  return (
    <div>
      <Breadcrumb title="login" items={[]} />
      <FormProvider {...methods}>
        <Form
          title="login"
          onSubmit={methods.handleSubmit((data) =>
            onSubmit(data, methods.formState.errors),
          )}
        >
          <Input
            id={EMAIL_INPUT_ID}
            type="email"
            label="Enter Email"
            validationOptions={emailValidationOptions()}
          />
          <Input
            id={PASSWORD_INPUT_ID}
            type="password"
            label="Password"
            validationOptions={passwordValidationOptions()}
          />
          <div className="flex gap-3">
            {/* i za ovo napraviti komponentu Checkbox*/}
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <Button type="primary-filled" className="py-3 shadow-lightgrey">
            Login
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
