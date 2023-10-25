import React, { useState, useEffect } from "react";

function VehicleForm() {
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    picture_url: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const vehicleUrl = "http://localhost:8100/api/models/";

    const requestData = {
      name: formData.name,
      picture_url: formData.picture_url,
      manufacturer_id: formData.manufacturer,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(vehicleUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        name: "",
        manufacturer: "",
        picture_url: "",
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
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-vehicle-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.name}
                placeholder="Model Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.picture_url}
                placeholder="picture_url"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.manufacturer}
                required
                name="manufacturer"
                id="manufacturer"
                className="form-select"
              >
                <option value="">Choose a manufacturer</option>
                {models.map((model) => (
                  <option
                    key={model.manufacturer.id}
                    value={model.manufacturer.id}
                  >
                    {model.manufacturer.id}
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

export default VehicleForm;
