import { Event } from "../types/event";

export const isOverlapping = (events: Event[], newEvent: Event): boolean => {
  return events.some((event) => {
    const newStart = new Date(newEvent.startDateTime).getTime();
    const newEnd = new Date(newEvent.endDateTime).getTime();
    const existingStart = new Date(event.startDateTime).getTime();
    const existingEnd = new Date(event.endDateTime).getTime();

    return newStart < existingEnd && newEnd > existingStart;
  });
};
