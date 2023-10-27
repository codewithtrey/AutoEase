import { useEffect, useState } from "react";

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8090/api/salespeople/");

    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
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
          <th>Employee id</th>
        </tr>
      </thead>
      <tbody>
        {salespeople.map((salesperson) => {
          return (
            <tr key={salesperson.id}>
              <td>{salesperson.first_name}</td>
              <td>{salesperson.last_name}</td>
              <td>{salesperson.employee_id}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SalespeopleList;
