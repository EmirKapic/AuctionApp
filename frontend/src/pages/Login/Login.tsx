import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Checkbox from "components/Common/Checkbox";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import LoggedIn from "components/Common/LoggedInError";
import { UserContext } from "contexts/UserContext";
import LoginResponse from "models/LoginResponse";
import User from "models/User";
import { useContext, useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FetchReturnType, fetchData } from "services/FetchData";
import UrlBuilder from "services/UrlBuilder";
import {
  emailValidationOptions,
  passwordValidationOptions,
} from "services/UseFormValidators";

const EMAIL_INPUT_ID = "emailInput";
const PASSWORD_INPUT_ID = "passwordInput";

export interface LoginProps {
  handleLogin: (user: User, token: string) => void;
}

export default function Login(props: LoginProps) {
  const methods = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const userContext = useContext(UserContext);

  function resolveFetchData(data: FetchReturnType<LoginResponse>): void {
    if (!data.success) {
      methods.setError(PASSWORD_INPUT_ID, {
        type: "custom",
        message: "Incorrect email or password",
      });
    } else {
      if (rememberMe) {
        localStorage.setItem("rememberEmail", data.data.user.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }
      props.handleLogin(data.data.user, data.data.token);
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
    fetchData<LoginResponse, LoginRequest>(url, {
      method: "POST",
      body: requestBody,
      headers: headers,
    }).then(resolveFetchData);
  }

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      methods.setValue(EMAIL_INPUT_ID, rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  if (userContext) {
    return <LoggedIn />;
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