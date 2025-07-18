import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../types/event";
import { isOverlapping } from "../../utils/validation";

interface EventState {
  events: Event[];
  filters: {
    searchTerm: string;
    type: string;
    category: string;
    startDate?: string;
    endDate?: string;
    sortBy: "startDateTime" | "title";
  };
}

const loadFromStorage = (): Event[] => {
  try {
    const stored = localStorage.getItem("events");
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error loading events from localStorage:", error);
    return [];
  }
};

const saveToStorage = (events: Event[]) => {
  try {
    localStorage.setItem("events", JSON.stringify(events));
  } catch (error) {
    console.error("Error saving events to localStorage:", error);
  }
};

const initialState: EventState = {
  events: loadFromStorage(),
  filters: {
    searchTerm: "",
    type: "",
    category: "",
    startDate: "",
    endDate: "",
    sortBy: "startDateTime",
  }
};

// Helper to compare just the date (ignoring time)
const isSameDate = (dateStr1: string, dateStr2: string) => {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      if (isOverlapping(state.events, action.payload)) {
        throw new Error("Event overlaps with existing event.");
      }
      state.events.push(action.payload);
      saveToStorage(state.events);
    },

    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      const eventsExcludingCurrent = state.events.filter(e => e.id !== action.payload.id);
      if (isOverlapping(eventsExcludingCurrent, action.payload)) {
        throw new Error("Event overlaps with existing event.");
      }
      if (index !== -1) {
        state.events[index] = action.payload;
        saveToStorage(state.events);
      }
    },

    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
      saveToStorage(state.events);
    },

    setFilters: (state, action: PayloadAction<Partial<EventState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  setFilters,
  resetFilters,
} = eventSlice.actions;

export const selectFilteredEvents = (state: EventState) => {
  const { events, filters } = state;

  return events
    .filter((event) => {
      const matchesSearch =
        !filters.searchTerm ||
        event.title.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesType = !filters.type || event.eventType === filters.type;

      const matchesCategory =
        !filters.category || event.category === filters.category;

      const matchesStartDate =
        !filters.startDate || isSameDate(event.startDateTime, filters.startDate);

      const matchesEndDate =
        !filters.endDate || new Date(event.startDateTime) <= new Date(filters.endDate);

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStartDate &&
        matchesEndDate
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return (
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
      );
    });
};

export default eventSlice.reducer;
