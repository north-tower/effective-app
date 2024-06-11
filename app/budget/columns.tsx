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
export type Budget = {
    id: string
    name: string
    budget: string
}


export const columns: ColumnDef<Budget>[] = [
 
      {
        accessorKey: "category",
        header: "Expense Category",
      }, 

      {
        accessorKey: "totalExpenses",
        header: () => <div className="text-right">Total Expenses</div>,
        cell: ({ row }) => {
          const tot = parseFloat(row.getValue("totalExpenses"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
          }).format(tot)
    
          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        accessorKey: "budget",
        header: () => <div className="text-right">Budget</div>,
        cell: ({ row }) => {
          const budget = parseFloat(row.getValue("budget"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
          }).format(budget)
    
          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        accessorKey: "percentageUsed",
        header: "Percentage Used",
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
      const budget = row.original
 
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
      // onClick={async () => {
      //   try {
        
      //     // Perform the PUT request
      //     const response = await axios.put(`https://supreme-goggles-beta.vercel.app/api/v1/updateIncome/${budget.id}`);
    
    
      //     // Redirect to a new URL if the PUT request was successful
      //     console.log('Expense updated successfully');
      //     window.location.reload();
      //   } catch (error) {
      //     console.error('Failed to update expense:', error);
      //     alert('Failed to update expense. Please try again.');
      //   }
      // }
      // }
    >
      Delete    </DropdownMenuItem>
    
    
    
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
      )
    },
  },
]
