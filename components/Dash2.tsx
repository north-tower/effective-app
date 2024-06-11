'use client'

import { useState, useEffect } from "react";

export type Tot = {
  totalExpenses: number;
};

export type Tot2 = {
  totalIncome: number;
};

async function fetchData() {
  try {
    const response = await fetch('https://supreme-goggles-beta.vercel.app/api/v1/getTotalExpenses');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Tot = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { totalExpenses: 0 };
  }
}

async function fetchData2() {
  try {
    const response2 = await fetch('https://supreme-goggles-beta.vercel.app/api/v1/getTotalIncome');
    if (!response2.ok) {
      throw new Error('Network response was not ok');
    }
    const data2: Tot2 = await response2.json();
    return data2;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { totalIncome: 0 };
  }
}

function Dash2() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    fetchData().then((data) => {
      setTotalExpenses(data.totalExpenses);
    });
  }, []);

  useEffect(() => {
    fetchData2().then((data2) => {
      setTotalIncome(data2.totalIncome);
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div>
      <div className="m-10 grid gap-5 sm:grid-cols-3  mx-auto max-w-screen-lg">
        <div className="px-4 py-6 shadow-lg shadow-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-blue-400 p-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          <p className="mt-4 font-medium">Expenses</p>
          <p className="mt-2 text-xl font-medium">
          {formatCurrency(totalExpenses)}
            
          </p>
          
        </div>
        <div className="px-4 py-6 shadow-lg shadow-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-rose-400 p-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <p className="mt-4 font-medium">Revenue</p>
          <p className="mt-2 text-xl font-medium">
            {formatCurrency(totalIncome)}
           
          </p>
          
        </div>
        <div className="px-4 py-6 shadow-lg shadow-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-medium">Profit Margin</p>
          <p className="mt-2 text-xl font-medium">
          {formatCurrency(totalIncome - totalExpenses)}
            
          </p>
          
        </div>
        <div className="px-4 py-6 shadow-lg shadow-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-medium">Targets</p>
          <p className="mt-2 text-xl font-medium">
            $23.4k
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Dash2;
