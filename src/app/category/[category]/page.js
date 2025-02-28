"use client";
import { fetchBooksByCategory } from "@/services/bookService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/componenets/Navbar";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = decodeURIComponent(params.category);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(category, "category");

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      try {
        const booksByCategory = await fetchBooksByCategory(category);
        console.log(booksByCategory, "Fetched Books");
        setBooks(booksByCategory.books); // Fix: Actually set the fetched books
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]); // Ensure books is always an array
      }
      setIsLoading(false);
    };

    getBooks();
  }, [category]);

  console.log(books, "Books in state");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleViewDetails = (id) => {
    router.push(`/bookDetails/${id}`);
  };
  return (
    <div className="min-h-screen p-8">
      <Navbar />
      <div>
        <div className="my-5 bg-[#045754] p-5 ">
          <div className="flex sm:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-white text-xl font-semibold w-1/2 uppercase">
              {category}
            </h2>
          </div>

          {books.length === 0 ? (
            <div className="text-white text-center py-10">
              No books found. Try a different category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-4 p-4 bg-white rounded-lg shadow-md">
                    {book.volumeInfo?.imageLinks?.thumbnail && (
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
                          {book.volumeInfo.authors?.join(", ") ||
                            "Unknown Author"}
                        </p>
                        {book.volumeInfo.description && (
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {book.volumeInfo.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleViewDetails(book.id)}
                        className="bg-[#013230] p-2 px-4 text-white rounded-lg mt-4 hover:bg-[#012120] transition-colors self-start"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
