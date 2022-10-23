import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Drawer, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function SignIn({ name }) {
  const [drawer, setDrawer] = React.useState(false);
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
      <Link style={{ width: "100%" }} to="/user">
        <Button variant="outlined" sx={{ width: "100%" }}>
          Sign In
        </Button>
      </Link>
      <Button
        variant="outlined"
        sx={{ width: "100%" }}
        onClick={() => setDrawer(true)}
      >
        Drawer
      </Button>
      <Drawer
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <Typography> Is Drawer</Typography>
      </Drawer>
    </Box>
  );
}
