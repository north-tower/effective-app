"use client"

import { useEffect, useState } from 'react';
import { Budget, columns } from "./columns"
import { DataTable } from "./data-table"

async function fetchData() {
  try {
    const response = await fetch('https://supreme-goggles-beta.vercel.app/api/v1/getAllBudgetUsages');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Budget[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Budget[]>([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (

    <div>
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
        
    </div>
    
  )
}
