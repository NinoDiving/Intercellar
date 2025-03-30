import ModalConnectWallet from "../modal/modalWallet";
import { useAccount, useDisconnect } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import Vitalik from "../../../public/images/Vitalik_Buterin.jpg";
import "./navbar.css";
import { StyledButton } from "../style/styledbutton";

export default function Navbar() {
  const { disconnect } = useDisconnect();
  const account = useAccount();
  return (
    <header className="navbar">
      {account.status === "connected" ? (
        <nav>
          <Link href="/profile">
            <Image src={Vitalik} alt="Profile" width={80} height={80} />
          </Link>
          <StyledButton type="button" onClick={() => disconnect()}>
            Disconnect
          </StyledButton>
        </nav>
      ) : (
        <ModalConnectWallet />
      )}
    </header>
  );
}
