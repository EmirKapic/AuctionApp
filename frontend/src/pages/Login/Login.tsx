import Breadcrumb from "components/Common/Breadcrumb";
import Button from "components/Common/Button";
import Form from "components/Common/Form";
import Input from "components/Common/Input";
import User from "models/User";
import { useState } from "react";

export interface LoginProps {
  handleLogin: (user: User) => void;
}

export default function Login(props: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div>
      <Breadcrumb title="login" items={[]} />
      <Form title="login" onSubmit={(e) => {}}>
        <Input
          value={email}
          type="email"
          setValue={setEmail}
          label="Enter Email"
        />
        <Input
          value={password}
          type="password"
          setValue={setPassword}
          label="Password"
        />
        <div className="flex gap-3">
          <input type="checkbox" />
          <label>Remember me</label>
        </div>
        <Button type="primary-filled" className="py-3 shadow-lightgrey">
          Login
        </Button>
      </Form>
    </div>
  );
}
