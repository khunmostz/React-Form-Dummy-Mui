import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Drawer, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

export default function SignIn({ name }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/user");
  }, [user, loading]);
  return (
    <Box
      sx={{
        width: 500,
        height: 500,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "30px" }}>
        SignIn Adventures <br></br>
      </Typography>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        sx={{ width: "100%", marginBottom: "20px" }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        sx={{ width: "100%", marginBottom: "40px" }}
      />
      <Button
        variant="outlined"
        sx={{ width: "100%" }}
        onClick={() => {
          logInWithEmailAndPassword(email, password);
        }}
      >
        Sign In
      </Button>
      <ToastContainer />
    </Box>
  );
}
