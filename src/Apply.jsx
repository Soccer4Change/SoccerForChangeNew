import axios from "axios";
import { useState } from "react";

export default function Apply() {
  const fields = [
    {
      title: "email",
      placeholder: "johnjohnson@example.com",
    },
    {
      title: "message",
      placeholder: "Please include any relevant information or links here.",
      area: true,
      required: false,
    },
  ];

  return (
    <div className="flex lg:flex-row flex-col gap-12 items-center px-8 lg:px-28 md:px-20 sm:px-14 pt-12 pb-32 bg-gray-50">
      <div className="z-0 relative flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold">Join our team</h1>
          <hr className="border-4 w-12 border-emerald-600" />
        </div>
        <p className="max-w-[75ch]">
          Are you ready to make a positive impact in your community? Fill out
          this application, and the dedicated team at Soccer For Change will
          review it and get back to you soon. We're excited to have you join us
          in making a difference!
        </p>
      </div>

      <div className="flex-1">
        <FormCard
          fields={fields}
          button="Submit Application"
          endpoint="apply"
        />
      </div>
    </div>
  );
}

export function FormCard({ fields, button, title = null, endpoint }) {
  const initialFormData = fields.reduce(
    (acc, field) => {
      acc[field.title] = field.value || "";
      return acc;
    },
    {
      firstName: "",
      lastName: "",
    }
  );

  const [formData, setFormData] = useState(initialFormData);

  const [postSuccess, setPostSuccess] = useState(null);

  const isFormValid = Object.entries(formData).every(
    ([key, value]) => key == "message" || value != ""
  );

  function handleChange(e, key) {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  }

  const handlePostClick = async () => {
    try {
      const response = await axios.post(
        `https://api.soccerforchange.org:444/api/${endpoint}`,
        formData
      );
      setPostSuccess(response.data);
    } catch (error) {
      setPostSuccess(
        error.response ? error.response.data : "Unknown error. Try again later."
      );
    }
  };

  return (
    <div className="p-6 sm:p-12 shadow-lg min-w-fit rounded-lg relative bg-white flex flex-col items-start gap-6">
      {title && <h1 className="text-2xl font-semibold">{title}</h1>}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <InputField
          title="First Name"
          placeholder="John"
          onChange={(e) => handleChange(e, "firstName")}
        />
        <InputField
          title="Last Name"
          placeholder="Johnson"
          onChange={(e) => handleChange(e, "lastName")}
        />
      </div>

      {fields
        .filter((field) => !field.title.toLowerCase().includes("id"))
        .map((field, index) => (
          <InputField
            {...field}
            onChange={(e) => handleChange(e, field.title)}
            key={index}
          />
        ))}

      <div className="flex gap-6 items-center">
        <button
          className={`flex-1 px-5 uppercase tracking-wide py-3 ${
            isFormValid ? "bg-emerald-600 shadow" : "bg-gray-300"
          } rounded text-white text-xs font-semibold transition-all`}
          onClick={isFormValid ? handlePostClick : () => {}}
        >
          {button}
        </button>
        {postSuccess !== null && (
          <p
            className={`font-semibold ${
              postSuccess.success ? "text-green-600" : "text-red-600"
            }
            `}
          >
            {postSuccess.message}
          </p>
        )}
      </div>
    </div>
  );
}

function InputField({
  title,
  placeholder,
  onChange,
  area = false,
  required = true,
}) {
  const styling = "w-full rounded bg-gray-100 px-4 py-2 font-light";

  return (
    <div className="w-full flex flex-col gap-2">
      <h3 className="uppercase tracking-wide text-xs font-semibold">
        {title}
        {required && <span className="text-red-500"> *</span>}
      </h3>
      {area ? (
        <textarea
          rows={4}
          cols={50}
          className={styling}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          className={styling}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
}
