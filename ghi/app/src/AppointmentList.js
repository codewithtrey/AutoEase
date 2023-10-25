import { useEffect, useState } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [inventoryVins, setInventoryVins] = useState([]);

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

      const vins = inventoryData.autos.map(auto => auto.vin);
      setInventoryVins(vins);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Is VIP?</th>
          <th>Customer</th>
          <th>Date and Time</th>
          <th>Technician</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => {
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AppointmentList;
