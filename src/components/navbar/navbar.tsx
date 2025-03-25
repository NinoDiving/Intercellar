import { useRouter } from "next/navigation";
import ModalConnectWallet from "../modal/modal";
import { useAccount, useDisconnect } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import Vitalik from "../../public/images/Vitalik_Buterin.jpg";
import "./navbar.css";
export default function Navbar() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const account = useAccount();
  return (
    <header className="navbar">
      {account.status === "connected" ? (
        <nav>
          <Link href="/profile">
            <Image src={Vitalik} alt="Profile" width={80} height={80} />
          </Link>
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        </nav>
      ) : (
        <ModalConnectWallet />
      )}
    </header>
  );
}
