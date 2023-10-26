import React, {useState, useEffect} from 'react'


function SalesForm() {
    const [automobiles, setAutomobiles] = useState([])
    const [salesperson,setSalesperson] = useState([])
    const [customers,setCustomers] = useState([])
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',
  })


  const getAutomobiles = async () => {
    const url = 'http://localhost:8100/api/automobiles/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  }


  const getSalespeople = async () => {
    const url = 'http://localhost:8090/api/salespeople/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setSalesperson(data.salespeople);
    }
  }


  const getCustomers = async () => {
    const url = 'http://localhost:8090/api/customers/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }

  useEffect(() => {
    getAutomobiles();
  }, []);

  useEffect(() => {
    getSalespeople();
  }, []);

  useEffect(() => {
    getCustomers();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const salesUrl = 'http://localhost:8090/api/sales/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(salesUrl, fetchConfig);

    
    if (response.ok) {
      setFormData({
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',
      });
    }
  }


  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value 
    });
  }

  return(
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Add a sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
                <div className="mb-3">
                <label htmlFor="automobile">Automobile VIN</label>
                    <select onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                    <option value="">Choose an automobile</option>
                    {automobiles?.map(automobile => {
                        return (
                        <option key={automobile.vin} value={automobile.id}>{automobile.vin}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                <label htmlFor="salesperson">Salesperson</label>
                    <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose a salesperson</option>
                    {salesperson?.map(person => {
                        return (
                        <option key={person.id} value={person.id}>{person.first_name} {person.last_name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="mb-3">
                <label htmlFor="customer">Customer</label>
                    <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                    <option value="">Choose a customer</option>
                    {customers?.map(customer => {
                        return (
                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                        )
                    })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.price} placeholder="price" required type="pricet" name="price" id="price" className="form-control" />
                    <label htmlFor="price">Price</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
    </div>

  )
}

export default SalesForm