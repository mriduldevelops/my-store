"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationButton from "./PaginationButton";

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </PaginationButton>

      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </PaginationButton>
    </div>
  );
}
