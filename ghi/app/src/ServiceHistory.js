import { useEffect, useState } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [inventoryVins, setInventoryVins] = useState([]);
  const [searchVIN, setSearchVIN] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const getData = async () => {
    const appointmentResponse = await fetch(
      "http://localhost:8080/api/appointments/"
    );
    const inventoryResponse = await fetch(
      "http://localhost:8100/api/automobiles/"
    );

    if (appointmentResponse.ok && inventoryResponse.ok) {
      const appointmentData = await appointmentResponse.json();
      const inventoryData = await inventoryResponse.json();

      setAppointments(appointmentData.appointments);

      const vins = inventoryData.autos.map((auto) => auto.vin);
      setInventoryVins(vins);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filterAppointments = () => {
    if (searchVIN === "") {
      setFilteredAppointments([]);
    } else {
      const filtered = appointments.filter(
        (appointment) => appointment.vin === searchVIN
      );
      setFilteredAppointments(filtered);
    }

    setSearchPerformed(true);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter VIN"
          value={searchVIN}
          onChange={(e) => setSearchVIN(e.target.value)}
        />
        <button onClick={filterAppointments}>Search</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date and Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(searchPerformed ? filteredAppointments : appointments).map(
            (appointment) => {
              const isVIP = inventoryVins.includes(appointment.vin);
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{isVIP ? "Yes" : "No"}</td>
                  <td>{appointment.customer}</td>
                  <td>{appointment.date_time}</td>
                  <td>
                    {appointment.technician.first_name}{" "}
                    {appointment.technician.last_name}
                  </td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.status}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
