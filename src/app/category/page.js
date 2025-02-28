"use client";
import { fetchAllCategories } from "@/services/bookService";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/componenets/Navbar";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getBooksAndCategories = async () => {
      setIsLoading(true);
      try {
        // Fetch all categories
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);
        console.log("Fetched categories:", categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBooksAndCategories();
  }, []);

  const handleCategoryClick = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className="py-7 px-5  shadow-lg">
      <Navbar />
      <div className="my-5 bg-[#045754] p-5 ">
        <div className="flex sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-white text-xl font-semibold w-1/2 uppercase">
            Categories
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-white text-center py-10">
            No categories found. Try a different search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories?.map((category) => (
              <div
                key={category.category}
                className="bg-white w-full rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category.category)}
              >
                {category.books[0]?.volumeInfo.imageLinks?.thumbnail && (
                  <div className="relative h-56 w-full rounded-lg overflow-hidden">
                    <img
                      src={category.books[0].volumeInfo.imageLinks.thumbnail}
                      alt={category.category}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                )}
                <p className="text-center text-sm uppercase text-gray-800 font-semibold mt-2">
                  {category.category}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
