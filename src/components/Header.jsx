import Container from "@mui/material/Container";
import Snowfall from "react-snowfall";

export default function Header() {
  return (
    <>
      <Container maxWidth="sm">
        <h1 style={{ color: "white" }}>Secret Satsa</h1>
      </Container>
       {/* TODO: find a better performing snow lib (seems a bit laggy on startup) */}
      <Snowfall />
    </>
  );
}
