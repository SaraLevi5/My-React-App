import { Container } from "@mui/material";
const MainComponent = ({ children }) => {
  return (
    <Container
      sx={{
        minHeight: "80vh",
      }}
    >
      {children}
    </Container>
  );
};
export default MainComponent;
