
# Product Lookup Tool

A simple React application that allows users to search for products and view key details using the [Fake Store API](https://fakestoreapi.com/). This tool showcases core React skills, including API handling, state management, and conditional rendering. The app is styled with Material-UI for a clean and responsive design.

## Features
- **Product Search**: Search by product name with debounced input to reduce API calls.
- **Product Details**: Displays product name, price, rating, and category.
- **Error Handling**: Displays an error message if no products are found or if an API error occurs.
- **Responsive Design**: Styled with Material-UI components for a modern and consistent look.

## Live Demo
Check out the live demo of the application [here](https://product-lookup-bygaurav.netlify.app).

## Dependencies
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Material-UI](https://mui.com/) - React component library for UI design.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests.

## Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/gaurav0630/Product-LookUp.git
   cd product-lookup-tool
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The app should now be running at `http://localhost:3000`.

### Usage
1. **Search for a Product**: Use the search bar to type a product name.
2. **View Product Details**: Once a product is found, you’ll see its details, including the name, price, rating, and category.
3. **Error Handling**: If no products are found, an error message will display.

### File Structure
- `src/`
  - `App.js` - Main component managing state and rendering.
  - `components/`
    - `ProductSearch.js` - Search component with debounced input.
    - `ProductCard.js` - Component to display product details in a card format.
  - `index.js` - Renders the app.

### API Reference
This app uses the [Fake Store API](https://fakestoreapi.com/) to fetch product data.
