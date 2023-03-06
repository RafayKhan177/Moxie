import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

import { useSelector } from "react-redux";

const theme = createTheme();

const Profile = () => {
  const items = useSelector((state) => state);
  const userData = items.userData[0];

  const navigate = useNavigate();
  const firebase = useFirebase();

  const [profilePic, setProfilePic] = React.useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await firebase.updateProfileData(
      data.get("name"),
      data.get("address"),
      profilePic
    );
    navigate("/Moxie");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="ProfilePage">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffffad",
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {userData ? (
              <img src={userData.photoURL} alt="avatar" />
            ) : (
              <LockOutlinedIcon />
            )}
          </Avatar>
          <Typography component="h1" variant="h5">
            {userData ? userData.displayName : null}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="current-name"
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus
            />

            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="file-upload"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Profile;
