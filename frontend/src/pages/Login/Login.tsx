import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Checkbox from "components/Common/Checkbox";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import Category from "models/Category";
import User from "models/User";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { FetchReturnType, fetchData } from "services/FetchData";
import UrlBuilder from "services/UrlBuilder";
import {
  emailValidationOptions,
  passwordValidationOptions,
} from "services/UseFormValidators";

const EMAIL_INPUT_ID = "emailInput";
const PASSWORD_INPUT_ID = "passwordInput";

export interface LoginProps {
  handleLogin: (user: User) => void;
}

export default function Login(props: LoginProps) {
  const methods = useForm();
  const [rememberMe, setRememberMe] = useState(false);

  function resolveFetchData(data: FetchReturnType<User>): void {
    if (!data.success) {
      methods.setError(PASSWORD_INPUT_ID, {
        type: "custom",
        message: "Incorrect email or password",
      });
    } else {
      props.handleLogin(data.data);
    }
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    const url = new UrlBuilder().auth().login().url;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestBody: LoginRequest = {
      email: data[EMAIL_INPUT_ID],
      password: data[PASSWORD_INPUT_ID],
    };
    fetchData<User>(url, {
      method: "POST",
      body: requestBody,
      headers: headers,
    }).then(resolveFetchData);
  }

  return (
    <div>
      <Breadcrumb title="login" items={[]} />
      <FormProvider {...methods}>
        <Form
          title="login"
          onSubmit={methods.handleSubmit((data) => onSubmit(data))}
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
          <Checkbox
            id="rememberMeCheckbox"
            label="Remember me"
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <Button
            type="primary-filled"
            className="py-3 shadow-lightgrey uppercase"
          >
            Login
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}
