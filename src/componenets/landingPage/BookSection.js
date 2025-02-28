"use client";
import {
  fetchAllBooks,
  fetchAllCategories,
  fetchBookById,
  searchBooks,
} from "@/services/bookService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function BookSection() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addBooks, setAddBooks] = useState(10);
  const router = useRouter();
  useEffect(() => {
    const getBooksAndCategories = async () => {
      setIsLoading(true);
      try {
        // Fetch all books
        const books = await fetchAllBooks(undefined, addBooks);
        console.log("Fetched books:", books);
        setBooks(books);

        // Fetch all categories
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBooksAndCategories();
  }, [addBooks]);

  const handleViewDetails = (id) => {
    router.push(`/bookDetails/${id}`);
  };
  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;
    setIsLoading(true);
    const searchedBooks = await searchBooks(searchQuery);
    setBooks(searchedBooks);
    setIsLoading(false);
  };

  const handleCategoryClick = (category) => {
    router.push(`/category/${category}`);
  };
  return (
    <div
      className="bg-[#045754] p-6 shadow-lg "
      style={{ paddingTop: "60px", background: "#045754", padding: "60px" }}
    >
      {/* Search Bar */}
      <div className="flex sm:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-white text-3xl font-semibold w-1/2 ">Books</h2>
        <div
          className="flex md:flex-row flex-col gap-2 sm:w-auto"
          style={{ display: "flex" }}
        >
          <input
            type="text"
            placeholder="Search books..."
            className="p-2 rounded-lg flex-grow sm:flex-grow-0 sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#013230]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-[#013230] p-2 px-6 text-white rounded-lg hover:bg-[#012120] transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      {/* Books Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-white text-center py-10">
          No books found. Try a different search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {books?.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex md:flex-row flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <div className="flex-shrink-0 w-48 h-64 overflow-hidden rounded-lg">
                    <Image
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      width={192}
                      height={256}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      by{" "}
                      {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                    </p>
                    {book.volumeInfo.description && (
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {book.volumeInfo.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleViewDetails(book.id)}
                    className="bg-[#013230] p-2 px-4 w-full text-white rounded-lg mt-4 hover:bg-[#012120] transition-colors self-start"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="h-full flex justify-center items-center underline">
            <button
              className="text-xl underline text-white h-56"
              style={{
                textDecoration: "underline",
                height: "266px",
              }}
              onClick={() => {
                setAddBooks(addBooks + 5);
              }}
            >
              <p className="bg-[#013230] p-2 px-4 w-full text-white rounded-lg mt-4 hover:bg-[#012120] transition-colors self-start">
                {" "}
                View More
              </p>
            </button>
          </div>
        </div>
      )}
      {/* Category Section */}
      <div className=" " style={{ margin: "20px 0px" }}>
        <div className="flex sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-white text-xl font-semibold w-1/2 ">
            Categories
          </h2>
          <button
            className="text-xl underline text-white h-56"
            style={{
              textDecoration: "underline",
            }}
            onClick={() => {
              router.push("/category");
            }}
          >
            View All
          </button>
        </div>

        <div className=" flex grid-cols-1  justify-between sm:grid-cols-3 md:grid-cols-4  gap-4 ">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.category}
              className="bg-white w-full rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCategoryClick(category.category)}
            >
              {category.books[0]?.volumeInfo.imageLinks?.thumbnail && (
                <div className="relative h-56 w-full  rounded-lg overflow-hidden">
                  <img
                    src={category.books[0].volumeInfo.imageLinks.thumbnail}
                    alt={category.category}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
              <p className="text-center text-sm uppercase  text-gray-800 font-semibold mt-2">
                {category.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
