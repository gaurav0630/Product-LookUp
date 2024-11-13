import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia, Rating } from '@mui/material';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 250,
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        cursor: 'pointer',
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ height: 140, objectFit: 'contain', marginTop: 1 }}
      />
      <CardContent>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            fontWeight: 'bold',
          }}
        >
          {product.title}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Rating name="read-only" value={product.rating?.rate || 0} readOnly size="small" />
          <Typography variant="body2" color="textSecondary" ml={1}>
            ({product.rating?.count || 0})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
