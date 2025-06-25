import { useEffect, useState } from "react"
import Engine from "./Engine"

export default function Car()
{
    const [id, setId] = useState('');
    const [brand, setBrand] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [mileage, setMileage] = useState('');
    const [yearOfRelease, setYearOfRelease] = useState('');
    const [cubics, setCubics] = useState('');

    const [cars, setCars] = useState([]);
    const [showCars, setShowCars] = useState(false);
    const [message, setMessage] = useState('');

    function handleAddCar() {
        if (
            id !== '' &&
            brand !== '' &&
            numberOfSeats !== '' &&
            mileage !== '' &&
            yearOfRelease !== '' &&
            cubics !== ''
        ) {
            setCars(prev => [
                ...prev,
                {
                    id,
                    brand,
                    numberOfSeats,
                    mileage,
                    yearOfRelease,
                    engine: { cubics }
                }
            ]);
            setId('');
            setBrand('');
            setNumberOfSeats('');
            setMileage('');
            setYearOfRelease('');
            setCubics('');
        }
    }

    useEffect(() => {
        if (cars.length > 0) {
            setMessage('New car added!');
            const timer = setTimeout(() => setMessage(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [cars]);

    return (
        <div>
            <div>
                <label>ID: </label>
                <input
                    type="number" min="0"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
            </div>
            <div>
                <label>Brand: </label>
                <input
                    type="text"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                />
            </div>
            <div>
                <label>Number of Seats: </label>
                <input
                    type="number" min="0"
                    value={numberOfSeats}
                    onChange={e => setNumberOfSeats(e.target.value)}
                />
            </div>
            <div>
                <label>Mileage: </label>
                <input
                    type="number" min = "0"
                    value={mileage}
                    onChange={e => setMileage(e.target.value)}
                />
            </div>
            <div>
                <label>Year of Release: </label>
                <input
                    type="number" min ="1900"
                    value={yearOfRelease}
                    onChange={e => setYearOfRelease(e.target.value)}
                />
            </div>
            <Engine cubics={cubics} setCubics={setCubics} />
            <button onClick={handleAddCar}>Add Car</button>
            <button onClick={() => setShowCars(!showCars)} style={{marginLeft: "10px"}}>
                Show Cars
            </button>
            <hr />
            {message && <div style={{color: "green"}}>{message}</div>}
            {showCars && (
                <div>
                    <h3>All car brands:</h3>
                    <ul>
                        {cars.map((car, idx) => (
                            <li key={idx}>
                                {car.brand} - Engine: {car.engine.cubics} cubics
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}