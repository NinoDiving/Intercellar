import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useConnect } from "wagmi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--background-color-modal)",
  borderRadius: "var(--radius-ref)",
  boxShadow: 24,
  p: 4,
};

export default function ModalConnectWallet() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { connectors, connect, status, error } = useConnect();
  return (
    <div>
      <Button onClick={handleOpen}>Get started</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Connect your wallet"
        aria-describedby="button to connect your wallet"
      >
        <Box sx={style}>
          <Typography id="connect-title" variant="h6" component="h2">
            Connect your wallet
          </Typography>
          <Typography id="connect-button" sx={{ mt: 2 }}>
            {connectors.map((connector) => (
              <div key={connector.id}>
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  type="button"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? "Connecting..." : connector.name}
                </button>
                {error && <div className="error">{error.message}</div>}
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
