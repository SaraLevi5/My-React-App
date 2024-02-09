import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const EmbeddedMap = ({ city }) => {
  const embedUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
    city
  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <Box sx={{ width: "100%" }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="450"
        title="business map location"
        frameBorder="0"
      ></iframe>
    </Box>
  );
};

EmbeddedMap.propTypes = {
  city: PropTypes.string,
};

export default EmbeddedMap;
