import { useEffect, useState } from "react"
import axios from "axios"

export default function Car()
{
    const [brand, setBrand] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState('');
    const [mileage, setMileage] = useState('');
    const [yearOfRelease, setYearOfRelease] = useState('');

    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState('');
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCars();
    }, []);

    async function fetchCars() {
        try {
            const response = await axios.get("https://localhost:7289/api/Cars/get-cars");
            setCars(response.data);
        } catch (err) {
            setMessage("Error fetching cars!");
        }
    }

    function openModal(car = null) {
        if (car) {
            setEditId(car.id);
            setBrand(car.brand);
            setNumberOfSeats(car.numberOfSeats);
            setMileage(car.mileage);
            setYearOfRelease(car.yearOfRelease);
        } else {
            resetForm();
        }
        setShowModal(true);
    }

    function closeModal() {
        resetForm();
        setShowModal(false);
    }

    async function handleAddCar() {
        if (
            brand !== '' &&
            numberOfSeats !== '' &&
            mileage !== '' &&
            yearOfRelease !== ''
        ) {
            const newCar = {
                brand,
                numberOfSeats: Number(numberOfSeats),
                mileage: Number(mileage),
                yearOfRelease: Number(yearOfRelease)
            };
            try {
                await axios.post("https://localhost:7289/api/Cars/add-car", [newCar]);
                setMessage("New car added!");
                closeModal();
                fetchCars();
            } catch (err) {
                setMessage("Error adding car!");
            }
            setTimeout(() => setMessage(''), 2000);
        }
    }

    async function handleUpdateCar() {
        if (
            brand !== '' &&
            numberOfSeats !== '' &&
            mileage !== '' &&
            yearOfRelease !== ''
        ) {
            const updatedCar = {
                id: editId,
                brand,
                numberOfSeats: Number(numberOfSeats),
                mileage: Number(mileage),
                yearOfRelease: Number(yearOfRelease)
            };
            try {
                await axios.put(`https://localhost:7289/api/Cars/update-car/${editId}`, updatedCar);
                setMessage("Car updated!");
                closeModal();
                fetchCars();
            } catch (err) {
                setMessage("Error updating car!");
            }
            setTimeout(() => setMessage(''), 2000);
        }
    }

    async function handleDeleteCar(id) {
        try {
            await axios.delete(`https://localhost:7289/api/Cars/delete-car/${id}`);
            setMessage("Car deleted!");
            fetchCars();
        } catch (err) {
            setMessage("Error deleting car!");
        }
        setTimeout(() => setMessage(''), 2000);
    }

    function resetForm() {
        setBrand('');
        setNumberOfSeats('');
        setMileage('');
        setYearOfRelease('');
        setEditId(null);
    }

    return (
        <div>
            <button onClick={() => openModal()}>Add new car</button>
            <hr />
            {message && <div className="message">{message}</div>}
            <h2>Cars Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Number of Seats</th>
                        <th>Mileage</th>
                        <th>Year</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car, idx) => (
                        <tr key={car.id ? car.id + '-' + idx : idx}>
                            <td>{car.brand}</td>
                            <td>{car.numberOfSeats}</td>
                            <td>{car.mileage}</td>
                            <td>{car.yearOfRelease}</td>
                            <td>
                                <button onClick={() => openModal(car)}>Edit</button>
                                <button style={{marginLeft: 8}} onClick={() => handleDeleteCar(car.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>{editId ? "Edit car" : "Add new car"}</h2>
                        <div className="form-row">
                            <label>Brand: </label>
                            <input
                                type="text"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label>Number of Seats: </label>
                            <input
                                type="number" min="0"
                                value={numberOfSeats}
                                onChange={e => setNumberOfSeats(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label>Mileage: </label>
                            <input
                                type="number" min="0"
                                value={mileage}
                                onChange={e => setMileage(e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <label>Year of Release: </label>
                            <input
                                type="number" min="1900"
                                value={yearOfRelease}
                                onChange={e => setYearOfRelease(e.target.value)}
                            />
                        </div>
                        <div style={{marginTop: 16}}>
                            {editId ? (
                                <>
                                    <button onClick={handleUpdateCar}>Update Car</button>
                                    <button style={{marginLeft: 10}} onClick={closeModal}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleAddCar}>Add Car</button>
                                    <button style={{marginLeft: 10}} onClick={closeModal}>Cancel</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}