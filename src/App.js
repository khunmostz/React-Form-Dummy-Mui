import logo from "./logo.svg";
import "./App.css";
import Layout from "./component/Layout";
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
      <Layout name="dasdas" />
    </Box>
  );
}

export default App;
