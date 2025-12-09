import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, ChevronsUpDown, ChevronUpIcon } from "lucide-react"

type TableColumnHeaderProps = {
    className?:string
    title:string
    field:string
    sort_by?:string
    sort_direction?:string
    setSortBy: (sort_by: string) => void
    setSortDirection: (sort_direction: string) => void
}

const TableColumnHeader = ({className, title, field, sort_by, sort_direction, setSortBy, setSortDirection}: TableColumnHeaderProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {sort_direction === "desc" && sort_by === field ? (
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            ) : sort_direction === "asc" && sort_by === field ? (
              <ChevronUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => {setSortBy(field); setSortDirection("asc")}}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {setSortBy(field); setSortDirection("desc")}}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TableColumnHeader