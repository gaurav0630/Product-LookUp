import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Box, CircularProgress, IconButton, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert, Pagination, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductSearch from './components/ProductSearch';
import ProductCard from './components/ProductCard';
import axios from 'axios';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchOffIcon from '@mui/icons-material/SearchOff';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 12; // Number of items per page

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: darkMode ? '#bb86fc' : '#6200ea' },
          secondary: { main: darkMode ? '#03dac6' : '#018786' },
          background: {
            default: darkMode ? '#121212' : '#fafafa',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
          h4: { fontWeight: 700 },
          body1: { fontWeight: 500 },
          button: { fontSize: '0.875rem' },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '0.875rem',
                color: darkMode ? '#121212' : '#ffffff',
                backgroundColor: darkMode ? '#bb86fc' : '#6200ea',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleCardClick = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product data.');
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(['All', ...response.data]);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when the category changes

    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Box
          component="header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: "1rem 2rem",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <Typography variant="h4">Product Lookup Tool</Typography>
          <Tooltip title="Toggle Dark Mode">
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Box display="flex" gap={2} px={3} mt={3}>
          <FormControl variant="outlined" sx={{ minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategorySelect}
              label="Category"
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box flexGrow={1}>
            <ProductSearch products={products} setFilteredProducts={setFilteredProducts} setError={setError} />
          </Box>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
          {loading ? (
            // Display loading spinner when loading is true
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress color="secondary" />
            </Box>
          ) : error ? (
            // Display error message when there's an error
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          ) : filteredProducts.length === 0 ? (
            // Display "No products found" when filteredProducts is empty
            <Box
              sx={{
                mt: 2,
                textAlign: 'center',
                padding: '1rem',
                color: 'error.main',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <SearchOffIcon fontSize="large" color="error" />
              <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                No products found.
              </Typography>
            </Box>
          ) : (
            // Display product cards when there are products available
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
              gap={2}
              mt={3}
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={handleCardClick} />
              ))}
            </Box>
          )}
          
          {/* Pagination controls are shown only when there are products to paginate */}
          {filteredProducts.length > 0 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </Box>


        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="warning" sx={{ width: '100%' }}>
            Coming Soon!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
