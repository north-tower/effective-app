"use client"

import { ChangeEvent, useEffect, useState } from 'react';
import { Invoice, columns } from "./columns"
import { DataTable } from "./data-table"

async function fetchData(startDate: string, endDate: string) {
  try {
    const response = await fetch(`https://supreme-goggles-beta.vercel.app/api/v1/getInvoice/${startDate}/${endDate}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Invoice[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Invoice[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fetchedData = await fetchData(startDate, endDate);
    setData(fetchedData);
    setSubmitted(true);
  };

  return (

    <div>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-4 container mx-auto py-5">
        <div> 
          <label className="block w-full">From:</label>
          <input
            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label className="block w-full">To:</label>
          <input
            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className='m-4'>
          <button type="submit" className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white">Fetch Data</button>
        </div>
      </div>
    </form>

    {submitted && (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )}
  </div>
    
  )
}
