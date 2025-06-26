import { useState, useEffect } from "react"
import axios from "axios"

export default function Driver() {
    const [name, setName] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDrivers();
    }, []);

    async function fetchDrivers() {
        try {
            const response = await axios.get("https://localhost:7289/api/Driver/get-drivers");
            setDrivers(response.data);
        } catch (err) {
            setMessage("Error fetching drivers!");
        }
    }

    async function handleAddDriver() {
        if (name !== '') {
            const newDriver = { name };
            try {
                await axios.post("https://localhost:7289/api/Driver/add-drivers", [newDriver]);
                setMessage("New driver added!");
                setName('');
                fetchDrivers();
            } catch (err) {
                setMessage("Error adding driver!");
            }
            setTimeout(() => setMessage(''), 2000);
        }
    }

    async function handleDeleteDriver(id) {
        try {
            await axios.delete(`https://localhost:7289/api/Driver/delete-driver/${id}`);
            setMessage("Driver deleted!");
            fetchDrivers();
        } catch (err) {
            setMessage("Error deleting driver!");
        }
        setTimeout(() => setMessage(''), 2000);
    }

    return (
        <div>
            <h2>Add new driver</h2>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <button onClick={handleAddDriver}>Add Driver</button>
            <hr />
            {message && <div style={{ color: "green" }}>{message}</div>}
            <h2>Drivers Table</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver, idx) => (
                        <tr key={driver.id ? driver.id + '-' + idx : idx}>
                            <td>{driver.name}</td>
                            <td>
                                <button onClick={() => handleDeleteDriver(driver.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}