import React, { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
    email: "", // Fix the variable name here
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("email", formData.email); // Fix the variable name here
    formDataToSend.append("resume", formData.resume);

    try {
      const response = await fetch("http://localhost:9007/sendData", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="text-sm font-semibold text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="text-sm font-semibold text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-gray-600"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="text-sm font-semibold text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="resume"
            className="text-sm font-semibold text-gray-600"
          >
            Resume (PDF)
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            accept=".pdf"
            className="w-full mt-2 p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
