export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: "Online" | "In-Person";
  location?: string;
  eventLink?: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
  organizer: {
    name: string;
    email: string;
  };
}

export type EventFormData = {
  title: string;
  description: string;
  eventType: "Online" | "In-Person";
  eventLink?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
};
