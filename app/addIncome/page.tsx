'use client'

import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type Income = {
  id: string;
  description: string;
  amount: string;
  status: string;
  category: string;
  email: string;
};

export type Categories = {
  uuid: string;
  name: string;
};

interface Category {
  id: string;
  name: string;
}
async function fetchData() {
  try {
    const response = await fetch('https://supreme-goggles-beta.vercel.app/api/v1/getIncomeCat');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Categories[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

function Page() {
  const [newIncome, setNewIncome] = useState<Income>({ id: '', description: '', amount: '', status: '', category: '', email: '' });
  const [categories, setCategories] = useState<Categories[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ id: '', name: '' });
  const router = useRouter(); // Initialize useRouter

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://supreme-goggles-beta.vercel.app/api/v1/addIncome', newIncome);
      window.alert('Income added successfully');
      router.push('/income'); // Redirect to the Drivers page
    } catch (error) {
      console.error('Error adding new driver:', error);
    }
  };

  const handleCategory = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://supreme-goggles-beta.vercel.app/api/v1/addIncomeCategory', newCategory);
      window.alert('Income Category added successfully');
      router.push('/addIncome'); // Redirect to the Drivers page
    } catch (error) {
      console.error('Error adding new income:', error);
    }
  };
  const [data, setData] = useState<Categories[]>([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []); 



  return (
 
    <div>
      <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white sm:max-w-lg">
      <Popover >
        <PopoverTrigger>Add Income Category</PopoverTrigger>
        <PopoverContent>
          <p className="mt-4 pl-4 text-xl font-bold">Add Category</p>
          <div className="flex flex-col items-center px-8 py-10">
            <form onSubmit={handleCategory}>
              <label className="block w-full">
                <p className="mb-1 text-sm text-gray-600">Enter Category Name</p>
                <input
                  className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleCategoryChange}
                  type="text"
                  placeholder="Enter Category Name"
                />
              </label>
              <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <button className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white">Add Category</button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>

      </div>
     
      <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
        <div className="bg-blue-800 px-10 py-10 text-center text-white">
          <p className="font-serif text-2xl font-semibold tracking-wider">Submit your income</p>
        </div>
        <div className="space-y-4 px-8 py-10">
          <form onSubmit={handleSubmit}>
            <label className="block">
              <p className="text-gray-600">Description</p>
              <input
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                type="text"
                id="description"
                name="description"
                value={newIncome.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
              />
            </label>
            <label className="block">
              <p className="text-gray-600">Amount</p>
              <input
                className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                id="amount"
                name="amount"
                value={newIncome.amount}
                onChange={handleInputChange}
                placeholder="Enter Amount"
              />
            </label>
            <label className="block">
              <p className="text-gray-600">Category</p>
              <select
                className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                id="category"
                name="category"
                value={newIncome.category}
                onChange={handleInputChange}
              >
                <option>--Select Category--</option>
                {data.map((data) => (
                  <option key={data.uuid} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="mt-4 rounded-full bg-blue-800 px-10 py-2 font-semibold text-white">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
