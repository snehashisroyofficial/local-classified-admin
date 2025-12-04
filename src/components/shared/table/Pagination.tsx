"use client";
import React from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  count: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];

  start: number;
  end: number;

  startPage: number;
  endPage: number;

  onItemsPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  count,
  itemsPerPage,
  itemsPerPageOptions = [2, 5, 10, 20],
  start,
  end,

  startPage,
  endPage,

  onItemsPerPageChange,
  onPageChange,
}) => {
  return (
    <div className="px-4 py-3 md:px-6 md:py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-4 justify-between shrink-0">
      {/* ---- Left Section: Items per page + X-Y of Total ---- */}
      <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-600 w-full sm:w-auto justify-center">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          >
            {itemsPerPageOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <span className="hidden sm:inline">|</span>
        <span>
          {start}-{end} of {count}
        </span>
      </div>

      {/* ---- Right Section: Pagination Buttons ---- */}
      <div className="flex space-x-1 sm:space-x-2 w-full sm:w-auto justify-center">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers (Only Desktop) */}
        <div className="hidden sm:flex space-x-1">
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-9 flex items-center justify-center text-sm rounded transition-colors ${
                currentPage === page
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Mobile: Page Indicator */}
        <span className="flex sm:hidden items-center px-2 text-sm font-medium text-slate-700">
          Page {currentPage}
        </span>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 border border-slate-200 text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 border border-slate-200 text-slate-700 rounded bg-white hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
