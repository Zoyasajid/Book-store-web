// bookService.js

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const categories = [
  "history",
  "english novel",
  "urdu novel",
  "poetry",
  "geography",
  "horror",
  "kid",
  "Thrillers",
];

// Fetch all books based on a query (default query is 'history')
const fetchAllBooks = async (query = "history") => {
  try {
    const response = await fetch(`${BASE_URL}?q=${query}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

// Fetch a specific book by ID
const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return null;
  }
};
const fetchBooksByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${category}&maxResults=10`);
    const data = await response.json();
    return { category, books: data.items || [] };
  } catch (error) {
    console.error(`Error fetching books for category: ${category}`, error);
    return { category, books: [] };
  }
};

const fetchAllCategories = async () => {
  const results = await Promise.all(categories.map(fetchBooksByCategory));
  return results;
};

// Search for books by a query
const searchBooks = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${query}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

export {
  fetchAllBooks,
  fetchBookById,
  searchBooks,
  fetchAllCategories,
  fetchBooksByCategory,
};
