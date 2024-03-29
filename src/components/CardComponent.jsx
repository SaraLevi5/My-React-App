import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";

const CardComponent = ({
  title,
  subtitle,
  img,
  alt,
  phone,
  address,
  cardNumber,
  id,
  liked,
  onCard,
  onDelete,
  onEdit,
  onLike,
}) => {
  const handleCardClick = () => {
    onCard(id);
  };
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  const handleLikeClick = () => {
    onLike(id);
  };
  return (
    <Card raised>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia component="img" image={img} alt={alt} height={200} />
      </CardActionArea>
      <CardHeader title={title} subheader={subtitle}></CardHeader>
      <Divider></Divider>

      <CardContent>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {phone}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {address.city}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {cardNumber}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <ModeIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={handleLikeClick}>
              <FavoriteIcon color={liked ? "error" : "inherit"} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.number.isRequired,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onCard: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  liked: PropTypes.bool,
};

export default CardComponent;
