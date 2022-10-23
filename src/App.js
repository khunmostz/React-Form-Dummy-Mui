import logo from "./logo.svg";
import "./App.css";
import SignIn from "./component/SignIn";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignIn name="dasdas" />
    </Box>
  );
}

export default App;
