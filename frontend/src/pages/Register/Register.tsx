import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import LoginResponse from "models/LoginResponse";
import User from "models/User";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FetchReturnType } from "services/fetching/FetchData";
import post from "services/fetching/Post";
import UrlBuilder from "services/UrlBuilder";
import {
  emailValidationOptions,
  passwordValidationOptions,
  requiredFieldsOptions,
} from "services/UseFormValidators";

const FIRST_NAME_ID = "firstNameInput";
const LAST_NAME_ID = "lastNameInput";
const PASSWORD_ID = "passwordInput";
const EMAIL_ID = "emailInput";

export interface RegisterProps {
  handleRegister: (user: User, token: string) => void;
}

export default function Register(props: RegisterProps) {
  const methods = useForm();
  function resolveFetchData(data: FetchReturnType<LoginResponse>): void {
    if (!data.success) {
      methods.setError(EMAIL_ID, {
        type: "custom",
        message: "Email already exists",
      });
    } else {
      props.handleRegister(data.data.user, data.data.token);
    }
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    const url = new UrlBuilder().auth().register().url;

    const requestBody: RegisterRequest = {
      firstName: data[FIRST_NAME_ID],
      lastName: data[LAST_NAME_ID],
      email: data[EMAIL_ID],
      password: data[PASSWORD_ID],
    };

    post<LoginResponse, LoginRequest>(url, requestBody).then(resolveFetchData);
  }

  return (
    <div>
      <Breadcrumb title="Register" />
      <FormProvider {...methods}>
        <Form
          title="Register"
          onSubmit={methods.handleSubmit((data) => onSubmit(data))}
        >
          <Input
            id={FIRST_NAME_ID}
            label="First Name"
            type="text"
            validationOptions={requiredFieldsOptions(
              "Please enter Your first name",
            )}
          />
          <Input
            id={LAST_NAME_ID}
            label="Last Name"
            type="text"
            validationOptions={requiredFieldsOptions(
              "Please enter Your last name",
            )}
          />
          <Input
            id={EMAIL_ID}
            label="Email"
            type="email"
            validationOptions={emailValidationOptions()}
          />
          <Input
            id={PASSWORD_ID}
            label="Password"
            type="password"
            validationOptions={passwordValidationOptions()}
          />
          <Button type="primary" className="py-3 uppercase">
            Register
          </Button>
          <div className="flex justify-center gap-3">
            <span className="text-lightgrey-200">Already have an account?</span>
            <Link to={"/account/login"} className="text-purple cursor-pointer">
              Login
            </Link>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
