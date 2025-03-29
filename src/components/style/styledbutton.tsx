import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)({
  backgroundColor: "var(--background-color-button)",
  border: "none",
  margin: "var(--spacing-ref)",
  width: "calc(var(--input-width) * 2)",
  height: "calc(var(--input-height) * 2)",
  borderRadius: "var(--radius-ref)",
  letterSpacing: "1px",
  fontSize: "calc(var(--font-size) * 1.2)",
  color: "var(--text-color)",
  boxShadow: "0px 0px 4px 0 rgba(247, 244, 244, 0.87)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontFamily: "var(--text-font)",

  "&:hover": {
    backgroundColor: "var(--background-color-button-hover)",
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
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(0)",
    transition: "transform 0.3s ease",
    borderRadius: "var(--radius-ref)",
  },

  "&:hover::after": {
    transform: "scale(1)",
  },
});
