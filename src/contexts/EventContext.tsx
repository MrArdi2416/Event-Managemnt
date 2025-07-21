import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Event } from "../types/event";

type Filters = {
  searchTerm: string;
  type: string;
  category: string;
  startDate: string;
  endDate: string;
  sortBy: "startDateTime" | "title";
};

type EventContextType = {
  events: Event[];
  filters: Filters;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  isInitialized: boolean;
};

const defaultFilters: Filters = {
  searchTerm: "",
  type: "",
  category: "",
  startDate: "",
  endDate: "",
  sortBy: "startDateTime",
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      try {
        const parsed = JSON.parse(storedEvents);
        if (Array.isArray(parsed)) {
          setEvents(parsed);
        }
      } catch (e) {
        console.error("Error parsing stored events:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events, isInitialized]);

  useEffect(() => {
    localStorage.setItem("eventFilters", JSON.stringify(filters));
  }, [filters]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const updateEvent = (updated: Event) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updated.id ? updated : ev))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const setFilters = (newFilters: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
    localStorage.removeItem("eventFilters");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        filters,
        addEvent,
        updateEvent,
        deleteEvent,
        setFilters,
        resetFilters,
        isInitialized,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};
