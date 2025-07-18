  import React, { useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useEvents } from "../../hooks/useEvents";
  import { useAuth } from "../../hooks/useAuth";
  import { Event, EventFormData } from "../../types/event";
  import { v4 as uuidv4 } from "uuid";

  // Validation schema using Yup
  export const eventSchema: yup.ObjectSchema<EventFormData> = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    eventType: yup
      .mixed<"Online" | "In-Person">()
      .oneOf(["Online", "In-Person"])
      .required("Event type is required"),
    eventLink: yup
      .string()
      .url("Must be a valid URL")
      .when("eventType", {
        is: "Online",
        then: (schema) => schema.required("Event link is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    location: yup.string().when("eventType", {
      is: "In-Person",
      then: (schema) => schema.required("Location is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    startDateTime: yup.string().required("Start date & time is required"),
    endDateTime: yup.string().required("End date & time is required"),
    category: yup.string().required("Category is required"),
  });

  // const defaultValues: EventFormData = {
  //   title: "",
  //   description: "",
  //   eventType: "Online",
  //   location: "",
  //   eventLink: "",
  //   startDateTime: "",
  //   endDateTime: "",
  //   category: "",
  // };

  interface EventFormProps {
    setIsOpen: (value: boolean) => void;
    defaultValues?: Partial<Event>; // For editing
    // isEdit?: boolean;
  }

  const EventForm: React.FC<EventFormProps> = ({
    setIsOpen,
    defaultValues,
    // isEdit,
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<EventFormData>({
      resolver: yupResolver(eventSchema),
      defaultValues: defaultValues || {}, // ✅ Pre-fill form
    });

    const startDateTime = watch("startDateTime"); // ✅ Correct variable name

    const { addEvent,updateEvent, events } = useEvents();
    const { user } = useAuth();
    const eventType = watch("eventType");

    useEffect(() => {
      if (defaultValues) {
        reset(defaultValues); // ✅ Pre-fill on modal open
      }
    }, [defaultValues, reset]);

  const onSubmit = (data: EventFormData) => {
    if (!user?.name || !user?.email) {
      alert("User information missing. Please log in again.");
      return;
    }

    const newStart = new Date(data.startDateTime).getTime();
    const newEnd = new Date(data.endDateTime).getTime();

    const hasOverlap = events.some((event) => {
      if (defaultValues?.id === event.id) return false; // ✅ Skip current editing event

      const existingStart = new Date(event.startDateTime).getTime();
      const existingEnd = new Date(event.endDateTime).getTime();

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });

    if (hasOverlap) {
      alert("This event time overlaps with an existing event. Please choose a different time.");
      return;
    }

    const finalEvent: Event = {
      ...data,
      id: defaultValues?.id ? defaultValues.id : uuidv4(), // ✅ Preserve ID for updates
      organizer: {
        name: user.name,
        email: user.email,
      },
    };

    try {
      if (defaultValues?.id) {
        updateEvent(finalEvent); // ✅ Update logic
      } else {
        addEvent(finalEvent); // ✅ Create logic
      }

      reset();
      setIsOpen(false);
    } catch (e) {
      alert((e as Error).message);
    }
  };


    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        {/* Fixed Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-center">
            {defaultValues?.id ? "Update Event" : "Create New Event"}
          </h2>
        </div>

        {/* Scrollable content */}
        <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Event Title <span className="text-red-500"> *</span></label>
            <input
              {...register("title")}
              placeholder="Enter title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description<span className="text-red-500"> *</span></label>
            <textarea
              {...register("description")}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e] resize-none"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Event Type */}
          <div>
            <label className="block mb-1 font-medium">Event Type<span className="text-red-500"> *</span></label>
            <select
              {...register("eventType")}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
            >
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {eventType === "Online" ? (
            <div>
              <label className="block mb-1 font-medium">Event Link<span className="text-red-500"> *</span></label>
              <input
                {...register("eventLink")}
                placeholder="https://example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
              />
              {errors.eventLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventLink.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block mb-1 font-medium">Location<span className="text-red-500"> *</span></label>
              <input
                {...register("location")}
                placeholder="Event location"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          )}

          {/* Start Date */}
          <div>
            <label className="block mb-1 font-medium">Start Date & Time<span className="text-red-500"> *</span></label>
            <input
              type="datetime-local"
              {...register("startDateTime")}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
            />
            {errors.startDateTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDateTime.message}
              </p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 font-medium">End Date & Time<span className="text-red-500"> *</span></label>
            <input
              type="datetime-local"
              {...register("endDateTime")}
              min={startDateTime || undefined} // disables past dates
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
            />
            {errors.endDateTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDateTime.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category<span className="text-red-500"> *</span></label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#fe4e4e]"
              defaultValue="Tech"
            >
              <option value="Tech">Tech</option>
              <option value="Business">Business</option>
              <option value="Music">Music</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#fe4e4e] text-white px-6 py-2 rounded-md font-medium hover:bg-[#e53e3e] transition"
            >
              {defaultValues?.id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
    );
  };

  export default EventForm;
