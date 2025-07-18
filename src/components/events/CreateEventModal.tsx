import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import EventForm from "./EventForm";
import { XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const CreateEventModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#fe4e4e] text-white px-4 py-2 rounded-md hover:bg-[#e53e3e] transition mb-6"
      >
        <PlusCircleIcon className="h-5 w-5" />
        Create Event
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg relative">
            <div className="absolute top-4 right-4">
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <Dialog.Title className="text-xl font-bold text-[#fe4e4e] mb-4">
             Manage Event
            </Dialog.Title>

            <EventForm setIsOpen={setIsOpen} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default CreateEventModal;
