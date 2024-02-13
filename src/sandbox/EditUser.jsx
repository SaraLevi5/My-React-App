import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";

const EditUser = () => {
  return (
    <Box>
      <Typography variant="h3" textAlign={"center"} m={3}>
        <Typography variant="span" color="primary">
          Edit profile {""}
        </Typography>
        is Coming soon...
      </Typography>
      <CardMedia
        title="this page is in progress"
        component="img"
        alt="this page is in progress, edit profile page coming soon"
        image="https://plus.unsplash.com/premium_photo-1681487857509-abb58345e594?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </Box>
  );
};

export default EditUser;
