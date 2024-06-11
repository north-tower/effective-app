'use client'

import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js


interface Category {
    id: string;
    name: string;
    budget: string;
}


function Page() {
    const [newCategory, setNewCategory] = useState<Category>({id: '', name: '', budget: ''});
    const router = useRouter(); // Initialize useRouter


    const handleCategory = async (e: FormEvent) => {
        e.preventDefault();
        try {
          await axios.post('https://supreme-goggles-beta.vercel.app/api/v1/addCategory', newCategory);
          // Display success message
          window.alert('Budget added successfully');
          // Redirect to Drivers page
          router.push('/budget'); // Redirect to the Drivers page

       
        } catch (error) {
          console.error('Error adding new driver:', error);
        }
      };

      const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCategory(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
  return (
    <div>
   
   <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
      <div className="bg-blue-800 px-10 py-10 text-center text-white">
        <p className="font-serif text-2xl font-semibold tracking-wider">
          Add Your Budget</p>
      </div>
          <div className="space-y-4 px-8 py-10">
            <form onSubmit={handleCategory}>
                <label className="block ">
                  <p className="mb-1 text-sm text-gray-600">Enter Name</p>
                  <input className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                     id="name"
                     name="name"
                     value={newCategory.name}
                     onChange={handleCategoryChange}
                  type="text" placeholder="Enter Name" />
                </label>
                <label className="block w-full">
                  <p className="mb-1 text-sm text-gray-600">Enter Budget Amount</p>
                  <input className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                   id="budget"
                   name="budget"
                   value={newCategory.budget}
                   onChange={handleCategoryChange}
                  type="text" placeholder="Enter Budget Amount" />
                </label>
               
                <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <button className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white">Add Category</button>
              </div>
              </form>
</div>
            </div>
    </div>
  )
}

export default Page