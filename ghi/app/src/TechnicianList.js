import { useEffect, useState } from "react";

function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);

  async function handleDelete(event, id) {
    const fetchOptions = {
      method: "DELETE",
    };
    const request = await fetch(
      `http://localhost:8080/api/technicians/${id}`,
      fetchOptions
    );

    if (request.ok) {
      getData();
    }
  }

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/technicians");

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Employee ID</th>
        </tr>
      </thead>
      <tbody>
        {technicians.map((technician) => {
          return (
            <tr key={technician.id}>
              <td>{technician.first_name}</td>
              <td>{technician.last_name}</td>
              <td>{technician.employee_id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TechnicianList;
