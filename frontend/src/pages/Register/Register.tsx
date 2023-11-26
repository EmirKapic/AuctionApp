import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import {
  FieldValues,
  FormProvider,
  RegisterOptions,
  useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";
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
  handleRegister: () => void;
}

function onSubmit(data: FieldValues) {
  console.log(data);
}

export default function Register(props: RegisterProps) {
  const methods = useForm();
  return (
    <div>
      <Breadcrumb title="Register" items={[]} />
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
          <Button type="primary" className="py-3">
            REGISTER
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
