import LowerNavbar from "./LowerNavbar";
import UpperNavbar from "./UpperNavbar";

export interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar(props: NavbarProps) {
  return (
    <header className=" w-full">
      <UpperNavbar onLogout={props.onLogout} />
      <LowerNavbar />
    </header>
  );
}
