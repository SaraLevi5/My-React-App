import { Box, Typography, ImageList, ImageListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h4">404 Page Not Found!</Typography>
      <ImageList>
        <ImageListItem>
          <img
            src="https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="page not found"
          />
        </ImageListItem>
      </ImageList>
      <NavLink to={ROUTES.HOME}>navigate to home page</NavLink>
    </Box>
  );
};
export default NotFoundPage;
