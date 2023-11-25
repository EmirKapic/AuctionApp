import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface RegisterProps {
  handleRegister: () => void;
}

export default function Register(props: RegisterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Breadcrumb title="Register" items={[]} />
      <Form
        title="Register"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          label="First Name"
          type="text"
          value={firstName}
          setValue={setFirstName}
        />
        <Input
          label="Last Name"
          type="text"
          value={lastName}
          setValue={setLastName}
        />
        <Input label="Email" type="email" value={email} setValue={setEmail} />
        <Input
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button type="primary" className="py-3">
          REGISTER
        </Button>
        <div className="flex justify-center gap-3">
          <span>Already have an account?</span>
          <Link to={"/account/login"} className="text-purple cursor-pointer">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}
