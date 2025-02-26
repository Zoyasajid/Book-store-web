"use client";
import { fetchBookById } from "@/services/bookService";
import { useRouter } from "next/navigation";
import React from "react"; // Import React to use React.use()

export default function BookDetailsPage({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params); // Unwrap the params Promise
  const { id } = unwrappedParams; // Destructure the id from unwrapped params
  const [book, setBook] = React.useState(null); // State to store the book data
  const [loading, setLoading] = React.useState(true); // State to handle loading

  // Fetch book data
  React.useEffect(() => {
    async function fetchBook() {
      try {
        const bookData = await fetchBookById(id);
        const bookDatas = await fetchBookById("84wbDAAAQBAJ");
        console.log(bookDatas, "book");
        setBook(bookData);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Book not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="bg-[#013230] p-2 px-6 text-white rounded-lg hover:bg-[#012120] transition-colors mb-6"
        >
          Back
        </button>

        {/* Book Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Book Cover */}
            {book.volumeInfo?.imageLinks?.thumbnail && (
              <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo?.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Book Details */}
            <div className="flex flex-col gap-6 flex-grow">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900">
                {book.volumeInfo?.title}
              </h1>

              {/* Author */}
              <p className="text-lg text-gray-700">
                by {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
              </p>

              {/* Description */}
              {book.volumeInfo?.description && (
                <div className="prose text-gray-700">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: book.volumeInfo?.description,
                    }}
                  />
                </div>
              )}

              {/* Additional Metadata */}
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Published:</span>{" "}
                  {book.volumeInfo?.publishedDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Publisher:</span>{" "}
                  {book.volumeInfo?.publisher || "Unknown"}
                </p>
                {book.volumeInfo?.pageCount && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Pages:</span>{" "}
                    {book.volumeInfo?.pageCount}
                  </p>
                )}
                {book.volumeInfo?.categories && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Categories:</span>{" "}
                    {book.volumeInfo?.categories.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
