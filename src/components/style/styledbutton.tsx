import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)({
  backgroundColor: "var(--background-color-button)",
  margin: "var(--spacing-ref)",
  width: "calc(var(--input-width) * 2)",
  height: "calc(var(--input-height) * 2)",
  borderRadius: "calc(var(--radius-ref) * 5)",
  letterSpacing: "1px",
  fontSize: "calc(var(--font-size) * 1.2)",
  color: "var(--text-color)",
  border: "1px solid #662c91",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontFamily: "var(--text-font)",

  "&:hover": {
    backgroundColor: "var(--background-color-button-hover)",
    border: "1px solid #f0edee",
    color: "black",
    transform: "translateY(-3px)",
  },

  "&:active": {
    transform: "translateY(-1px)",
    backgroundColor: "rgba(226, 213, 213, 0.486)",
    color: "black",
  },

  "&:disabled": {
    boxShadow: "inset 1px 1px 1px 1px rgb(255 255 255 / 20%)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    borderRadius: "calc(var(--radius-ref) * 5)",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(0)",
    transition: "transform 0.4s ease",
  },

  "&:hover::after": {
    transform: "scale(1)",
  },
});
