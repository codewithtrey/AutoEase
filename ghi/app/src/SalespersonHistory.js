import { useEffect, useState } from "react";

function SalespersonHistory() {
    const [salespeople,setSalespeople] = useState([])
    const [sales,setSales] = useState([])
    const [sale, setSale] = useState('')

    
    const getSalespeople = async () => {
    const url = 'http://localhost:8090/api/salespeople/'
    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json()
        setSalespeople(data.salespeople)
    }
    }
    
    const getSales = async () => {
    const url = 'http://localhost:8090/api/sales/'
    const response = await fetch(url)
    
    if (response.ok) {
        const data = await response.json()
        setSales(data.sales)
    }
}   
    const handleSelectChange = (event) => {
    const value = event.target.value
    setSale(value)
}
    
    console.log(sale)
    
    useEffect(() => {
    getSalespeople()
    getSales()
    }, [])
    

return(
        <div className="row">
            <div className= "container mb-3">
                <h1>Salesperson History</h1>
                <div className="mb-3">
                    <select  onChange={handleSelectChange} value={getSalespeople.salespeople} required name="salespeople" id="salespeople" className="form-select">
                    <option value="">Choose a salesperson</option>
                    {salespeople?.map(person => {
                        return (
                        <option key={person.id} value={person.id}>{person.first_name} {person.last_name}</option>
                        )
                    })}
                    </select>
                </div> 
            </div>
            <div className= "container mb-3">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter(purchases => purchases.salesperson.id === sale).map(purchase => (
                            <tr key={purchase.automobile.id}>
                                <td>{purchase.salesperson.first_name} {purchase.salesperson.last_name}</td>
                                <td>{purchase.customer.first_name} {purchase.customer.last_name}</td>
                                <td>{purchase.automobile.vin}</td>
                                <td>${purchase.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>



    )
}

export default SalespersonHistory;



