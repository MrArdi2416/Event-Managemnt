import React, { useEffect, useMemo, useRef } from "react";
import { useEvents } from "../../hooks/useEvents";
import EventCard from "./EventCard";
import { useSearchParams } from "react-router-dom";


const EventList: React.FC = () => {
  const { events, filters, setFilters, isInitialized } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialized = useRef(false);

  // ✅ Keep hooks at the top
  useEffect(() => {
    if (initialized.current) return;

    const query = Object.fromEntries(searchParams.entries());
    const hasParams = Object.keys(query).length > 0;

    if (hasParams) {
      setFilters({
        searchTerm: query.search || "",
        type: query.type || "",
        category: query.category || "",
        startDate: query.startDate || "",
        endDate: query.endDate || "",
        sortBy:
          query.sortBy === "title" || query.sortBy === "startDateTime"
            ? query.sortBy
            : "startDateTime",
      });
    }

    initialized.current = true;
  }, [searchParams, setFilters]);

  useEffect(() => {
    if (!initialized.current) return;

    const params: any = {};
    if (filters.searchTerm) params.search = filters.searchTerm;
    if (filters.type) params.type = filters.type;
    if (filters.category) params.category = filters.category;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.sortBy) params.sortBy = filters.sortBy;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const getOnlyDate = (datetime: string) => {
    const d = new Date(datetime);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // format: YYYY-MM-DD
  };

  const filteredEvents = useMemo(() => {
    return (
      events
        .filter((e) =>
          filters.searchTerm
            ? e?.title
                ?.toLowerCase()
                .includes(filters.searchTerm.toLowerCase()) ||
              e?.description
                ?.toLowerCase()
                .includes(filters.searchTerm.toLowerCase())
            : true
        )
        .filter((e) => (filters.type ? e?.eventType === filters.type : true))
        .filter((e) =>
          filters.category ? e?.category === filters.category : true
        )
        .filter((e) => {
          const eventStart = new Date(e.startDateTime);
          const eventEnd = new Date(e.endDateTime);

          const filterStart = filters.startDate
            ? new Date(filters.startDate)
            : null;
          const filterEnd = filters.endDate ? new Date(filters.endDate) : null;

          if (filterStart && filterEnd) {
            return eventStart <= filterEnd && eventEnd >= filterStart;
          }

          if (filterStart && !filterEnd) {
            return eventEnd >= filterStart;
          }

          if (!filterStart && filterEnd) {
            return eventStart <= filterEnd;
          }

          return true;
        })
        .filter((e) => e?.title && e?.startDateTime)
        .sort((a, b) => {
          if (filters.sortBy === "title") {
            return a?.title?.localeCompare(b?.title ?? "") ?? 0;
          }
          return (
            new Date(a?.startDateTime ?? "").getTime() -
            new Date(b?.startDateTime ?? "").getTime()
          );
        })
    );
  }, [events, filters]);

  // ✅ Conditional rendering AFTER all hooks
  if (!isInitialized) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#fe4e4e]">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
// const EventList: React.FC = () => {
//   // const { events, filters, setFilters } = useEvents();
//   const { events, filters, setFilters, isInitialized } = useEvents();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialized = useRef(false);

//   if (!isInitialized) {
//     return <div>Loading events...</div>;
//   }
//   useEffect(() => {
//     if (initialized.current) return;

//     const query = Object.fromEntries(searchParams.entries());
//     const hasParams = Object.keys(query).length > 0;

//     if (hasParams) {
//       setFilters({
//         searchTerm: query.search || "",
//         type: query.type || "",
//         category: query.category || "",
//         startDate: query.startDate || "",
//         endDate: query.endDate || "",
//         sortBy:
//           query.sortBy === "title" || query.sortBy === "startDateTime"
//             ? query.sortBy
//             : "startDateTime",
//       });
//     }

//     initialized.current = true;
//   }, [searchParams, setFilters]);

//   useEffect(() => {
//     if (!initialized.current) return;

//     const params: any = {};
//     if (filters.searchTerm) params.search = filters.searchTerm;
//     if (filters.type) params.type = filters.type;
//     if (filters.category) params.category = filters.category;
//     if (filters.startDate) params.startDate = filters.startDate;
//     if (filters.endDate) params.endDate = filters.endDate;
//     if (filters.sortBy) params.sortBy = filters.sortBy;

//     setSearchParams(params);
//   }, [filters, setSearchParams]);

//   const getOnlyDate = (datetime: string) => {
//     const d = new Date(datetime);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`; // format: YYYY-MM-DD
//   };
//   const filteredEvents = useMemo(() => {
//     return (
//       events
//         .filter((e) =>
//           filters.searchTerm
//             ? e?.title
//                 ?.toLowerCase()
//                 .includes(filters.searchTerm.toLowerCase()) ||
//               e?.description
//                 ?.toLowerCase()
//                 .includes(filters.searchTerm.toLowerCase())
//             : true
//         )
//         .filter((e) => (filters.type ? e?.eventType === filters.type : true))
//         .filter((e) =>
//           filters.category ? e?.category === filters.category : true
//         )
//         // .filter((e) => {
//         //   const start = filters.startDate
//         //     ? new Date(filters.startDate).getTime()
//         //     : 0;
//         //   const end = filters.endDate
//         //     ? new Date(filters.endDate).getTime()
//         //     : Infinity;
//         //   const eventTime = e?.startDateTime
//         //     ? new Date(e.startDateTime).getTime()
//         //     : 0;
//         //   return eventTime >= start && eventTime <= end;
//         // })
//         .filter((e) => {
//           const eventStart = new Date(e.startDateTime);
//           const eventEnd = new Date(e.endDateTime);

//           const filterStart = filters.startDate
//             ? new Date(filters.startDate)
//             : null;
//           const filterEnd = filters.endDate ? new Date(filters.endDate) : null;

//           // Event overlaps with filter range
//           if (filterStart && filterEnd) {
//             return eventStart <= filterEnd && eventEnd >= filterStart;
//           }

//           // Only start date selected
//           if (filterStart && !filterEnd) {
//             return eventEnd >= filterStart;
//           }

//           // Only end date selected
//           if (!filterStart && filterEnd) {
//             return eventStart <= filterEnd;
//           }

//           return true;
//         })
//         .filter((e) => e?.title && e?.startDateTime)
//         .sort((a, b) => {
//           if (filters.sortBy === "title") {
//             return a?.title?.localeCompare(b?.title ?? "") ?? 0;
//           }
//           return (
//             new Date(a?.startDateTime ?? "").getTime() -
//             new Date(b?.startDateTime ?? "").getTime()
//           );
//         })
//     );
//   }, [events, filters]);

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold text-[#fe4e4e]">Upcoming Events</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))
//         ) : (
//           <p className="text-gray-500 col-span-full">No events found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventList;
