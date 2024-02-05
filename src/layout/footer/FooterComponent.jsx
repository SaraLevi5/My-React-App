// FooterComponent
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CoffeeIcon from "@mui/icons-material/Coffee";
import DiamondIcon from "@mui/icons-material/Diamond";
const FooterComponent = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        mt: 2,
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="About" icon={<AcUnitIcon />} />
        <BottomNavigationAction label="Favorites" icon={<CoffeeIcon />} />
        <BottomNavigationAction label="My Cards" icon={<DiamondIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default FooterComponent;
