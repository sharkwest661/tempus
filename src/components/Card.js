// src/components/Card.js
import React from "react";
import Box from "./Box";

const Card = ({ children, ...rest }) => {
  return (
    <Box
      backgroundColor="cardBackground"
      borderRadius="m"
      padding="m"
      shadowOpacity={0.1}
      shadowRadius={10}
      shadowOffset={{ width: 0, height: 5 }}
      elevation={5}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
