
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationSection({ currentPage, totalPages, onPageChange }: PaginationSectionProps) {
  // Generate page numbers 
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="py-5">
      <Pagination>
        <PaginationContent>
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
}