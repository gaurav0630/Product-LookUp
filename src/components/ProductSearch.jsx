import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ProductSearch = ({ products, setFilteredProducts, setError }) => {
  const [query, setQuery] = useState('');

  // Define the search function using useCallback to avoid unnecessary re-creations
  const performSearch = useCallback(() => {
    setError('');

    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length > 0) {
        setFilteredProducts(filtered);
      } else {
        setError('No products found.');
        setFilteredProducts([]);
      }
    }
  }, [query, products, setError, setFilteredProducts]);

  // Debounce search using useEffect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, performSearch]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <Box display="flex" justifyContent="center" mb={3}>
      <TextField
        variant="outlined"
        placeholder="Search for a product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        InputProps={{
          startAdornment: (
            <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
              <SearchIcon />
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default ProductSearch;
