import { useState, useEffect } from "react"

export default function Driver() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [showDrivers, setShowDrivers] = useState(false);
    const [message, setMessage] = useState('');

    function handleAddDriver() {
        if (id !== '' && name !== '') {
            setDrivers(prev => [
                ...prev,
                { id, name }
            ]);
            setId('');
            setName('');
        }
    }

    useEffect(() => {
        if (drivers.length > 0) {
            setMessage('New driver added!');
            const timer = setTimeout(() => setMessage(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [drivers]);

    return (
        <div>
            <div>
                <label>ID: </label>
                <input
                    type="number" min = "0"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </div>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <button onClick={handleAddDriver}>Add Driver</button>
            <button onClick={() => setShowDrivers(!showDrivers)} style={{marginLeft: "10px"}}>
                Show Drivers
            </button>
            <hr />
            {message && <div style={{color: "green"}}>{message}</div>}
            {showDrivers && (
                <div>
                    <h3>All driver names:</h3>
                    <ul>
                        {drivers.map((driver, idx) => (
                            <li key={idx}>{driver.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}