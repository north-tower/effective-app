"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import axios from 'axios';
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
    id: string
    description: string
    amount: string
    status: string
    category: string
}


export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const createdAt: any = row.getValue("createdAt");

      if (
        createdAt && 
        typeof createdAt === "object" &&
        typeof createdAt._seconds === "number" &&
        typeof createdAt._nanoseconds === "number"
      ) {
        const milliseconds = createdAt._seconds * 1000 + Math.floor(createdAt._nanoseconds / 1000000);
        const date = new Date(milliseconds);
        const formattedDate = date.toLocaleDateString(); // Formats the date part only

        return <div className="text-right font-medium">{formattedDate}</div>;
      } else {
        console.error("Invalid timestamp format", createdAt);
        return <div className="text-right font-medium">Invalid date</div>;
      }
    },
  },
      {
        accessorKey: "description",
        header: "Description",
      },
     
      {
        accessorKey: "category",
        header: "Category",
      },
    
  {
    accessorKey: "status",
    header: "Status",
  },

//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Email
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//   },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const expense = row.original
 
      return (
        <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
      onClick={async () => {
        try {
        
          // Perform the PUT request
          const response = await axios.put(`https://supreme-goggles-beta.vercel.app/api/v1/updateExpense/${expense.id}`);
    
    
          // Redirect to a new URL if the PUT request was successful
          console.log('Expense updated successfully');
          window.location.reload();
        } catch (error) {
          console.error('Failed to update expense:', error);
          alert('Failed to update expense. Please try again.');
        }
      }
      }
    >
      Approve
    </DropdownMenuItem>
    
    
    
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
      )
    },
  },
]
