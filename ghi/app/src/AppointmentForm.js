import React, { useState, useEffect } from "react";

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    date_time: "",
    reason: "",
    status: "",
    vin: "",
    customer: "",
    technician: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentUrl = "http://localhost:8080/api/appointments/";

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(appointmentUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        date_time: "",
        reason: "",
        status: "",
        vin: "",
        customer: "",
        technician: "",
      });
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create A Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.vin}
                placeholder="Automobile VIN"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.customer}
                placeholder="Customer Name"
                required
                type="text"
                name="customer"
                id="customer"
                className="form-control"
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.date_time}
                placeholder="Date and Time"
                required
                type="datetime-local"
                name="date_time"
                id="date_time"
                className="form-control"
              />
              <label htmlFor="date_time">Date and Time</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.technician}
                required
                name="technician"
                id="technician"
                className="form-select"
              >
                <option value="">Choose a technician</option>
                {technicians.map((technician) => (
                  <option
                    key={technician.employee_id}
                    value={technician.employee_id}
                  >
                    {technician.employee_id}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.reason}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
