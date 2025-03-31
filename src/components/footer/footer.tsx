import Image from "next/image";
import logo from "../../../public/images/Logo.png";
import "./footer.css";
export default function Footer() {
  return (
    <footer>
      <Image src={logo} alt="logo" width={100} height={100} />
    </footer>
  );
}
