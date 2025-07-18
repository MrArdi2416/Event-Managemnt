import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEvents } from "../../hooks/useEvents";

const CATEGORY_OPTIONS = [
  "Tech",
  "Business",
  "Music",
  "Education",
  "Health",
  "Sports",
];

type FilterState = {
  searchTerm: string;
  type: string;
  startDate: string;
  category: string;
};

const EventFilters: React.FC = () => {
  const { setFilters } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setLocalFilters] = useState<FilterState>({
    searchTerm: searchParams.get("searchTerm") || "",
    type: searchParams.get("type") || "",
    startDate: searchParams.get("startDate") || "",
    category: searchParams.get("category") || "",
  });

  useEffect(() => {
    const queryParams = {
      searchTerm: searchParams.get("searchTerm") || "",
      type: searchParams.get("type") || "",
      startDate: searchParams.get("startDate") || "",
      category: searchParams.get("category") || "",
    };

    let finalParams = { ...queryParams };
    const hasParams = Object.values(queryParams).some((v) => v !== "");

    if (!hasParams) {
      const stored = localStorage.getItem("eventFilters");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          finalParams = { ...finalParams, ...parsed };

          const newParams = new URLSearchParams();
          Object.entries(finalParams).forEach(([k, v]) => {
            if (v) newParams.set(k, String(v));
          });
          setSearchParams(newParams);
        } catch (e) {
          console.error("Invalid localStorage filter:", e);
        }
      }
    }

    setLocalFilters(finalParams);
    setFilters(finalParams);
    //eslint-disable-next-line
  }, []);

  const setFiltersFromInput = (key: string, value: string) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);

    const updatedSearchParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([k, v]) => {
      if (v) updatedSearchParams.set(k, v);
    });
    setSearchParams(updatedSearchParams);

    localStorage.setItem("eventFilters", JSON.stringify(updatedFilters));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Search..."
        value={filters.searchTerm}
        onChange={(e) => setFiltersFromInput("searchTerm", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
      />

      <select
        value={filters.type}
        onChange={(e) => setFiltersFromInput("type", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
      >
        <option value="">All Types</option>
        <option value="Online">Online</option>
        <option value="In-Person">In-Person</option>
      </select>

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => setFiltersFromInput("startDate", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
      />

      <select
        value={filters.category}
        onChange={(e) => setFiltersFromInput("category", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
      >
        <option value="">All Categories</option>
        {CATEGORY_OPTIONS.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          const cleared = {
            searchTerm: "",
            type: "",
            startDate: "",
            category: "",
          };
          setLocalFilters(cleared);
          setFilters(cleared);
          setSearchParams({});
          localStorage.removeItem("eventFilters");
        }}
        className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition mt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EventFilters;
