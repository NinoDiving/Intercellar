import Link from "next/link";
import { useAccount } from "wagmi";
import "./profile.css";
export default function Profile() {
  const account = useAccount();
  return (
    <article className="profile">
      <h1>Account</h1>
      <Link className="link-home" href="/">
        Home
      </Link>
      <section>
        <h2>Your wallet is connected with: {account.connector?.name}</h2>
        <h3>
          Network used: <span>{account.chain?.name}</span>
        </h3>
        <p>Your wallet address: {account.address}</p>
      </section>
    </article>
  );
}
