import { Link } from "react-router-dom";

export default function LoggedIn() {
  return (
    <div className="text-center text-2xl">
      <div className=" text-green-600 m-10">You're already logged in.</div>
      <Link to={"/"}>
        Click here to go to <span className="text-purple">home page</span>
      </Link>
    </div>
  );
}
