import {
  CredentialResponse,
  GoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Checkbox from "components/Common/Checkbox";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import LoginResponse from "models/LoginResponse";
import User from "models/User";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FetchReturnType } from "services/fetching/FetchData";
import post from "services/fetching/Post";
import UrlBuilder from "services/UrlBuilder";
import { ReactFacebookLoginInfo } from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import get from "services/fetching/Get";
import {
  emailValidationOptions,
  passwordValidationOptions,
} from "services/UseFormValidators";
import { render } from "react-dom";
import Icon from "svgs/Icon";

const EMAIL_INPUT_ID = "emailInput";
const PASSWORD_INPUT_ID = "passwordInput";

export interface LoginProps {
  handleLogin: (user: User, token: string) => void;
}

export default function Login(props: LoginProps) {
  const methods = useForm();
  const [rememberMe, setRememberMe] = useState(false);

  function handleGoogleLogin(credentials: CredentialResponse): void {
    const url =
      new UrlBuilder().auth().login().oauth2().google().url +
      `?googleToken=${credentials.credential}`;
    get<LoginResponse>(url).then((response) =>
      props.handleLogin(response.data.user, response.data.token),
    );
  }

  function handleFacebookLogin(credentials: ReactFacebookLoginInfo): void {
    const url =
      new UrlBuilder().auth().login().oauth2().facebook().url +
      `?email=${credentials.email}`;
    get<LoginResponse>(url).then((response) =>
      props.handleLogin(response.data.user, response.data.token),
    );
  }

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

    const requestBody: LoginRequest = {
      email: data[EMAIL_INPUT_ID],
      password: data[PASSWORD_INPUT_ID],
    };
    post<LoginResponse, LoginRequest>(url, requestBody).then(resolveFetchData);
  }

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      methods.setValue(EMAIL_INPUT_ID, rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div>
      <Breadcrumb title="login" />
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
            checked={rememberMe}
            onChange={setRememberMe}
          >
            Remember me
          </Checkbox>
          <Button
            type="primary-filled"
            className="py-3 shadow-lightgrey uppercase"
          >
            Login
          </Button>
          <div className="flex justify-between border-t border-t-silver py-5">
            <GoogleLogin
              onSuccess={(res) => handleGoogleLogin(res)}
              useOneTap
            />
            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APP_ID}
              callback={(res) => {
                handleFacebookLogin(res as ReactFacebookLoginInfo);
              }}
              onFailure={() => {
                /* Necessary to define it but we don't really need it*/
              }}
              fields="email"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  type="button"
                  className="border rounded-md py-1 px-5 flex justify-center items-center gap-3"
                >
                  <Icon name="facebookSquare" />
                  <div>Login with facebook</div>
                </button>
              )}
            />
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
