'use client'

import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import Header from '@/components/Header';



interface Trip {
  uuid: string;
  destination: string;
  mileage: string;
  fuel: string
 
}

function Trip() {
  const [newTrip, setTrip] = useState<Trip>({ uuid: '', destination: '', mileage: '', fuel: ''});
  const router = useRouter(); // Initialize useRouter


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTrip((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://supreme-goggles-beta.vercel.app/api/v1/addTrip', newTrip);
      window.alert('Invoice added successfully');
      router.push('/invoice'); // Redirect to the Drivers page
    } catch (error) {
      console.error('Error adding new invoice:', error);
    }
  };

  return (
    <>
    <Header />
     <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-0">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-2xl font-bold text-gray-800">Dispatch</a>
        </div>
        <div className="flex flex-col sm:px-10 lg:px-20 xl:px-32 my-10 space-y-10">
        <form onSubmit={handleSubmit}>
                    <div className="px-4 pt-4">
            <div className="mt-0 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="bg-white px-4 pt-0">
                <p className="text-xl font-medium">Trip Details</p>
                <p className="text-gray-400">Start your trip by providing the trip details.</p>

                <div className="mt-4">

                  <label className="mb-2 block text-sm font-medium">Destination</label>
                  <div className="relative">
                    <input
                       id="destination"
                       name="destination"
                       value={newTrip.destination}
                       onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Destination for the trip"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium">Mileage</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="mileage"
                      name="mileage"
                      value={newTrip.mileage}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Mileage on the dashboard"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium">Fuel</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fuel"
                      name="fuel"
                      value={newTrip.fuel}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Refueled"
                    />
                  </div>
                </div>
               
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-50 px-4 pt-2">
            <p className="text-xl font-medium">Customer Details</p>
            <p className="text-gray-400">Complete your invoice by providing the customer details.</p>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">Customer Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newInvoice.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Full name"
                />
              </div>
            </div>
            
          </div> */}
          <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Enter Trip
            </button>
          </form>
        </div>
      </div>
    </div>
    
    </>
   
  );
}

export default Trip;
