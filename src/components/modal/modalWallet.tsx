import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useConnect } from "wagmi";
import "./modalWallet.css";
import MetaMask from "../../../public/images/metamask.png";
import Brave from "../../../public/images/brave.png";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StyledButton } from "../style/styledbutton";

const walletImages: Record<string, StaticImport | string> = {
  MetaMask: MetaMask,
  "Portefeuille Brave": Brave,
};

export default function ModalConnectWallet() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { connectors, connect, status, error } = useConnect();
  return (
    <div className="modal-wallet">
      <StyledButton onClick={handleOpen}>Connect wallet</StyledButton>
      <Modal
        className="modal-container"
        open={open}
        onClose={handleClose}
        aria-labelledby="Connect your wallet"
        aria-describedby="button to connect your wallet"
      >
        <Box className="modal-box">
          <Typography id="connect-title" variant="h6" component="h2">
            Connect your wallet
          </Typography>
          <Typography id="connect-button" sx={{ mt: 2 }}>
            {connectors.map((connector) => (
              <StyledButton
                key={connector.id}
                className={connector.name}
                onClick={() => connect({ connector })}
                type="button"
                disabled={status === "pending"}
              >
                {walletImages[connector.name] && (
                  <Image
                    src={walletImages[connector.name]}
                    alt={connector.name}
                    className="wallet-icon"
                    width={30}
                    height={30}
                  />
                )}
                <span className="wallet-name">{connector.name}</span>
              </StyledButton>
            ))}
            {error && <div className="error">{error?.message}</div>}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
