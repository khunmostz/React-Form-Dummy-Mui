import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function SignIn({ name }) {
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
      <Typography variant="h3" sx={{ marginBottom: "30px" }}>
        Sign In
      </Typography>

      <TextField
        id="email"
        label="Email"
        variant="outlined"
        sx={{ width: "100%", marginBottom: "20px" }}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        sx={{ width: "100%", marginBottom: "40px" }}
      />
      <Button variant="outlined" sx={{ width: "100%" }}>
        Sign In
      </Button>
    </Box>
  );
}
