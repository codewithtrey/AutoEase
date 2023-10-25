import React, { useState, useEffect } from "react";

function AutomobileForm() {
  const [autos, setAutos] = useState([]);
  const [formData, setFormData] = useState({
    color: "",
    year: "",
    vin: "",
    model: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const automobileUrl = "http://localhost:8100/api/automobiles/";

    const requestData = {
        color: formData.color,
        year: formData.year,
        vin: formData.vin,
        model_id: formData.model,
      };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(automobileUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        color: "",
        year: "",
        vin: "",
        model: "",
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
          <h1>Create an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.color}
                placeholder="Color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.year}
                placeholder="year"
                required
                type="number"
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.vin}
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.model}
                required
                name="model"
                id="model"
                className="form-select"
              >
                <option value="">Choose a model</option>
                {autos.map((auto) => (
                  <option
                    key={auto.id}
                    value={auto.id}
                  >
                    {auto.model.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
