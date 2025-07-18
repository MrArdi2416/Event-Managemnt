import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  addEvent,
  updateEvent,
  deleteEvent,
  setFilters,
  resetFilters,
} from "../redux/slices/eventSlice";
import { Event } from "../types/event";

export const useEvents = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const filters = useSelector((state: RootState) => state.events.filters);
  const dispatch = useDispatch();

  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

  return {
    events: safeEvents,
    filters,
    addEvent: (event: Event) => dispatch(addEvent(event)),
    updateEvent: (event: Event) => dispatch(updateEvent(event)),
    deleteEvent: (id: string) => dispatch(deleteEvent(id)),
    setFilters: (f: Partial<typeof filters>) => dispatch(setFilters(f)),
    resetFilters: () => dispatch(resetFilters()),
  };
};
