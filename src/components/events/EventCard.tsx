import React, { useState } from "react";
import { Event } from "../../types/event";
import { useEvents } from "../../hooks/useEvents";
import {
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import EventForm from "../events/EventForm"; // Adjust path if needed
import { Dialog } from "@headlessui/react";

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { deleteEvent } = useEvents();
  const [isEditOpen, setIsEditOpen] = useState(false); // ✅ Modal toggle

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event?.id);
    }
  };

  if (!event?.title || !event?.startDateTime || !event?.endDateTime) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-gray-500">Invalid event data</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#fe4e4e]">{event.title}</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-gray-700">
          {event.description || "No description provided."}
        </p>

        <div className="text-sm space-y-1">
          {event.eventType && (
            <p className="text-gray-500">{event.eventType}</p>
          )}
          <p className="text-gray-600">
            {new Date(event.startDateTime).toLocaleString()} →{" "}
            {new Date(event.endDateTime).toLocaleString()}
          </p>

          {event.eventType === "Online" && event.eventLink && (
            <p className="text-blue-600 underline">
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Event
              </a>
            </p>
          )}

          {event.eventType === "In-Person" && event.location && (
            <p className="text-gray-600">Location: {event.location}</p>
          )}

          {event.organizer?.name && (
            <p className="text-gray-600">
              Organizer:{" "}
              <span className="font-medium">{event.organizer.name}</span>
              {event.organizer?.email && <> ({event.organizer.email})</>}
            </p>
          )}

          {event.category && (
            <p className="text-gray-400">Category: {event.category}</p>
          )}
        </div>
      </div>

      {/* ✅ Edit Modal */}
      {isEditOpen && (
        <Dialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          className="relative z-50"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Modal Panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg relative">
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsEditOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-800" />
                </button>
              </div>
              <Dialog.Title className="text-xl font-bold text-[#fe4e4e] mb-4">
                New Event
              </Dialog.Title>
              <EventForm
                setIsOpen={setIsEditOpen}
                defaultValues={event} // ✅ Pre-fill the form
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default EventCard;
