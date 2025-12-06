"use client";
import React, { useEffect, useRef, useState } from "react";
// Adjust this import path to where you saved the Pagination component
import useUsers from "@/src/hooks/user/useUsers";
import { User } from "@/src/types/ads/user";
import useDebounce from "@/src/utils/useDebounce";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  BadgeCheck,
  Check,
  ClipboardClock,
  Ellipsis,
  EllipsisVertical,
  Eye,
  Info,
  MoreVertical,
  MoveDown,
  MoveUp,
  OctagonPause,
  OctagonX,
  Search,
  Shield,
  Trash,
  TriangleAlert,
  User as UserIcon,
  Users,
  X,
} from "lucide-react";
import Pagination from "@/src/components/shared/table/Pagination";
import Image from "next/image";
import moment from "moment";
import ActionPopup from "@/src/components/ads/active-ads/ActionPopup";
import ActionItem from "@/src/components/ads/active-ads/ActionItem";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { roleConfig, statusConfig } from "@/src/components/users/tableUtils";
import ListingActionModal from "@/src/components/ads/pending/PendingListingActionModal";
import { useUserListingActions } from "@/src/hooks/user/useUserListingActions";
import UserListingActionModal from "@/src/components/users/UserListingActionModal";
import { useRouter } from "next/navigation";

const CustomerListTable = () => {
  const router = useRouter();

  // --- State ---
  const [pageIndex, setPageIndex] = useState(0); // 0-based index for logic
  const [pageSize, setPageSize] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModalIndex, setShowModalIndex] = useState<number | null>(null);

  // Model config
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState({ type: "", isActive: false });
  const [isModalBackgroundOpen, setIsModalBackgroundOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // --- Data Fetching ---
  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
    error: errorUsers,
  } = useUsers({ limit: pageSize, page: pageIndex + 1 }); // API expects 1-based page

  const popupRef = useClickOutside<HTMLDivElement>({
    enabled: showModalIndex !== null,
    onClose: () => {
      setShowModalIndex(null);
    },
  });

  const {
    handleChangeRole,
    activeModal,
    setActiveModal,
    resetState,
    isLoading: isLoadingActions,
    isSuccess,
    handleVerifyEmail,
    handleDeleteUser,
    handleUpdateRole,
  } = useUserListingActions();

  const onConfirmAction = () => {
    if (!activeModal) return;

    switch (activeModal.type) {
      case "DELETE":
        handleDeleteUser({ id: activeModal.data.id });
        break;
    }
  };
  const closeModal = () => {
    setActiveModal(null);
    resetState();
    refetch();
  };
  useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearch]); // Use the debounced value for reset

  // --- Table Configuration ---
  const columnHelper = createColumnHelper<User>();

  const allColumns = [
    columnHelper.display({
      id: "full_name",
      cell: (info) => (
        <div className="max-w-68  mr-auto truncate capitalize pl-4">
          <div className="flex items-center gap-2">
            {info.row.original.user_avatar ? (
              <Image
                src={info.row.original.user_avatar}
                alt=""
                width={30}
                height={30}
                className=" rounded-full object-cover"
              />
            ) : (
              <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-gray-200">
                {info.row.original.full_name?.slice(0, 1)}
              </div>
            )}

            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-600 text-xs">
                {info.row.original.full_name}
              </span>
              <span className="text-gray-400 text-xs">
                {info.row.original.email}
              </span>
            </div>
          </div>
        </div>
      ),
      header: "Name",
    }),

    columnHelper.accessor("phone", {
      cell: (info) => (
        <div className="max-w-32 mx-auto truncate">
          <span>{info.getValue() ?? "-"}</span>
        </div>
      ),
      header: "Phone No.",
    }),
    columnHelper.accessor("role", {
      cell: (info) => {
        const role = info.row.original?.role;
        const config = roleConfig[role as keyof typeof roleConfig];

        if (!config) return null;

        return (
          <div className="max-w-32 mx-auto truncate">
            <div
              className={`py-1 px-2 flex items-center gap-1 text-xs rounded-full w-fit ${config.classes}`}
            >
              {config.icon}
              {config.label}
            </div>
          </div>
        );
      },

      header: "Role",
    }),

    columnHelper.display({
      cell: (info) => (
        <div className="max-w-32 mx-auto truncate">
          <span>
            {info.row.original?.email_verified ? (
              <div className="py-1 px-2 flex items-center gap-1 text-xs bg-green-100 rounded-full text-green-700 w-fit">
                <Check size={14} />
                Verified
              </div>
            ) : (
              <div className="py-1 px-2 flex items-center gap-1 text-xs  bg-red-100 rounded-full text-red-600 w-fit">
                {" "}
                <X size={14} />
                Not Verified
              </div>
            )}
          </span>
        </div>
      ),
      header: "Verified",
    }),
    columnHelper.display({
      cell: (info) => {
        const status = info.row.original?.account_status;
        const config = statusConfig[status as keyof typeof statusConfig];

        if (!config) return null;

        return (
          <div className="max-w-32 mx-auto truncate">
            <div
              className={`py-1 px-2 flex items-center gap-1 text-xs rounded-full w-fit ${config.classes}`}
            >
              {config.icon}
              {config.label}
            </div>
          </div>
        );
      },

      header: "Account Status",
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => (
        <div className="w-full flex justify-center items-center">
          {new Date(info.getValue()).toLocaleDateString()}
        </div>
      ),
      header: "Date",
    }),
    columnHelper.accessor("last_login", {
      cell: (info) => (
        <div className="w-full flex justify-center items-center">
          {info.getValue() ? moment(info.getValue()).fromNow() : "-"}
        </div>
      ),
      header: "Last Login",
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="relative">
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => setShowModalIndex(info.row.index)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          <ActionPopup ref={popupRef} open={showModalIndex === info.row.index}>
            {info.row.original.role == "user" && (
              <ActionItem
                icon={Shield}
                label="Make Admin"
                onClick={() =>
                  handleChangeRole({ id: info.row.original.id, role: "admin" })
                }
              />
            )}
            {info.row.original.role !== "user" && (
              <ActionItem
                icon={UserIcon}
                label="Make User"
                onClick={() =>
                  handleChangeRole({ id: info.row.original.id, role: "user" })
                }
              />
            )}
            {!info.row.original.email_verified && (
              <ActionItem
                icon={BadgeCheck}
                label="Mark Verified"
                onClick={() => handleVerifyEmail({ id: info.row.original.id })}
              />
            )}
            {info.row.original.account_status !== "suspend" && (
              <ActionItem
                icon={OctagonPause}
                label="Suspend User"
                onClick={() =>
                  handleUpdateRole({
                    id: info.row.original.id,
                    status: "suspend",
                  })
                }
              />
            )}
            {info.row.original.account_status !== "pending" && (
              <ActionItem
                icon={TriangleAlert}
                label="Pending User"
                onClick={() =>
                  handleUpdateRole({
                    id: info.row.original.id,
                    status: "pending",
                  })
                }
              />
            )}
            {info.row.original.account_status !== "active" && (
              <ActionItem
                icon={Check}
                label="Active User"
                onClick={() =>
                  handleUpdateRole({
                    id: info.row.original.id,
                    status: "active",
                  })
                }
              />
            )}

            <ActionItem
              icon={Trash}
              danger
              label="Delete User"
              onClick={() => {
                setActiveModal({
                  type: "DELETE",
                  data: info.row.original,
                });
              }}
            />
            <div className="h-px bg-slate-100 my-1 hidden sm:block" />
            <ActionItem
              icon={Eye}
              label="View Details"
              onClick={() => router.push(`/users/${info.row.original.id}`)}
            />
          </ActionPopup>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users?.data || [],
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((users?.count ?? 0) / pageSize),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      globalFilter,
      columnFilters,
    },
  });

  // --- Pagination Calculations ---
  const totalItems = users?.count ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startRecord = totalItems === 0 ? 0 : pageIndex * pageSize + 1;
  const endRecord = Math.min((pageIndex + 1) * pageSize, totalItems);

  // Logic to show a window of page numbers (e.g., 5 pages at a time)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, pageIndex + 1 - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <>
      <div className="w-full relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="min-h-[80vh] w-full divide-y-2 overflow-auto scrollbar-show bg-input/50 ">
          {isLoading ? (
            <div className="text-sm font-light flex justify-center items-center gap-2 min-h-[80vh] h-full">
              <span>loading</span>
              <div className="h-4 w-4 border-t-transparent border-2 rounded-full animate-spin"></div>
            </div>
          ) : users?.count === 0 || isError ? (
            <div className="h-full min-h-[83vh] flex justify-center items-center ">
              {isError ? (
                <div className="text-red-500 text-sm font-light">
                  {errorUsers?.message || "Failed to fetch users"}
                </div>
              ) : (
                <div className="text-gray-500 text-sm font-light">
                  No users found
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full max-h-[80vh] ">
              <table className="w-full text-center h-full scrollbar-show overflow-auto scrollbar-show">
                <thead className="bg-slate-100  sticky top-0 ">
                  {table.getHeaderGroups().map((eachHeader) => (
                    <tr key={eachHeader.id}>
                      {eachHeader.headers.map((currentHeader) => (
                        <th
                          onClick={currentHeader.column.getToggleSortingHandler()}
                          key={currentHeader.id}
                          className="p-3 font-semibold text-sm capitalize "
                        >
                          <div className="flex justify-center items-center gap-2">
                            {flexRender(
                              currentHeader.column.columnDef.header,
                              currentHeader.getContext()
                            )}
                            {currentHeader.column.getIsSorted() &&
                              {
                                asc: <MoveUp size={16} />,
                                desc: <MoveDown size={16} />,
                              }[
                                currentHeader.column.getIsSorted() as
                                  | "asc"
                                  | "desc"
                              ]}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y-1 divide-slate-100 h-full w-full  ">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="w-full  cursor-pointer odd:bg-sidebar/5 even:bg-sidebar-active-text hover:bg-sidebar-highlight hover:transition-colors hover:duration-200 hover:ease-in-out  "
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-2 text-sm justify-content-center "
                        >
                          <div className="w-full flex  justify-center ">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- NEW PAGINATION COMPONENT --- */}
        {!isLoading && !isError && (users?.count ?? 0) > 0 && (
          <Pagination
            currentPage={pageIndex + 1}
            totalPages={totalPages}
            count={totalItems}
            itemsPerPage={pageSize}
            itemsPerPageOptions={[15, 30, 45, 80, 100]}
            start={startRecord}
            end={endRecord}
            startPage={startPage}
            endPage={endPage}
            onItemsPerPageChange={(val) => {
              setPageSize(val);
              setPageIndex(0);
            }}
            onPageChange={(val) => setPageIndex(val - 1)}
          />
        )}
      </div>
      <UserListingActionModal
        isOpen={!!activeModal}
        onClose={closeModal}
        type={"DELETE"}
        data={activeModal?.data ?? null}
        // Pass Hook State
        onConfirm={onConfirmAction}
        isLoading={isLoadingActions}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default CustomerListTable;
