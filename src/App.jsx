import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Header from "./components/Header";
import useCarList from "./hooks/useCarlist";

function App() {
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [returnDateTime, setReturnDateTime] = useState(null);
  const [duration, setDuration] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
  });

  const { carList, loading, error } = useCarList();
  const [filteredCar, setFilteredCar] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discount, setDiscount] = useState("");
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [totalCharges, setTotalCharges] = useState(0);

  useEffect(() => {
    if (!loading && !error) {
      handleFilterCar();
    }
  }, [carList, loading, error, selectedType]);

  useEffect(() => {
    if (pickupDateTime && returnDateTime && filteredCar.length > 0) {
      calculateDuration(pickupDateTime, returnDateTime);
      calculateTotalCharges();
    }
  }, [pickupDateTime, returnDateTime, filteredCar, additionalCharges]);

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
  };

  const handleFilterCar = () => {
    if (selectedType === "All") {
      setFilteredCar(carList);
    } else {
      setFilteredCar(carList.filter((car) => car.type === selectedType));
    }
  };

  const handlePickupChange = (date) => {
    setPickupDateTime(date);
  };

  const handleReturnChange = (date) => {
    setReturnDateTime(date);
  };

  const calculateDuration = (pickupDate, returnDate) => {
    const diffInMillis = Math.abs(returnDate - pickupDate);
    const days = Math.ceil(diffInMillis / (1000 * 60 * 60 * 24)); // Calculate total days
    let hours = Math.floor(diffInMillis / (1000 * 60 * 60)); // Calculate total hours

    // Convert hours to weeks if the duration is over 7 days
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      hours -= weeks * 7 * 24;
      setDuration({ weeks, days: days % 7, hours });
    } else {
      setDuration({ weeks: 0, days, hours });
    }
  };

  const calculateTotalCharges = () => {
    if (filteredCar.length > 0) {
      let total = 0;
      const selectedCar = filteredCar[0]; // Assuming only one car is selected
      total += selectedCar.rates.weekly * duration.weeks;
      total += selectedCar.rates.daily * duration.days;
      total += selectedCar.rates.hourly * duration.hours;
      additionalCharges.forEach((charge) => {
        total += parseFloat(charge.value);
      });
      setTotalCharges(total);
    }
  };

  const handleAdditionalChargeChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setAdditionalCharges([
        ...additionalCharges,
        { name: e.target.name, value },
      ]);
    } else {
      setAdditionalCharges(
        additionalCharges.filter((charge) => charge.name !== e.target.name)
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-3">
            <div className="section">
              <h2 className="section-heading">Reservation Details</h2>
              <label className="form-label" htmlFor="pickup-date">
                Pickup Date and Time*
              </label>
              <br />
              <DatePicker
                placeholderText="Select Date and Time"
                className="custom-date-picker lg:w-[430px]"
                selected={pickupDateTime}
                onChange={handlePickupChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <br />
              <label className="form-label" htmlFor="return-date">
                Return Date and Time*
              </label>{" "}
              <br />
              <DatePicker
                className="custom-date-picker lg:w-[430px]"
                placeholderText="Select Date and Time"
                selected={returnDateTime}
                onChange={handleReturnChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />{" "}
              <br />
              <label className="form-label" htmlFor="duration">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={`${
                  duration.weeks > 0 ? duration.weeks + " weeks " : ""
                }${duration.days > 0 ? duration.days + " days " : ""}${
                  duration.hours
                } hours`}
                readOnly
                className="input-field"
              />
              <label className="form-label" htmlFor="discount">
                Discount
              </label>
              <input
                type="text"
                id="discount"
                name="discount"
                className="input-field"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
            </div>
            <div className="section mt-3">
              <h2 className="section-heading">Vehicle Information</h2>
              <label className="form-label" htmlFor="vehicle-type">
                Vehicle Type*
              </label>
              <select
                id="car-type"
                onChange={handleChangeType}
                value={selectedType}
                className="select-vehicle"
              >
                <option value="All">All</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
              </select>
              <label htmlFor="cars" className="form-label">
                Select Vehicle:
              </label>
              <select id="cars" className="select-vehicle">
                {filteredCar.map((car) => (
                  <option key={car.id} value={`${car.make} ${car.model}`}>
                    {car.make} {car.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-3">
            <div className="section">
              <h2 className="section-heading">Customer Information</h2>
              <label className="form-label" htmlFor="first-name">
                First Name<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="first-name"
                name="first-name"
                className="input-field"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <label className="form-label" htmlFor="last-name">
                Last Name<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="last-name"
                name="last-name"
                className="input-field"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <label className="form-label" htmlFor="email">
                Email<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="email"
                name="email"
                className="input-field"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label className="form-label" htmlFor="phone">
                Phones<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="phone"
                name="phone"
                className="input-field"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="section mt-3">
              <h2 className="section-heading">Additional Charges</h2>
              <div className="checkbox-container">
                <label className="form-label">
                  <input
                    type="checkbox"
                    name="Collision Damage Waiver"
                    value="9.00"
                    onChange={handleAdditionalChargeChange}
                  />{" "}
                  Collision Damage Waiver: $9.00
                </label>
                <label className="form-label">
                  <input
                    type="checkbox"
                    name="Liability Insurance"
                    onChange={handleAdditionalChargeChange}
                  />{" "}
                  Liability Insurance: $15.00
                </label>
                <label className="form-label">
                  <input
                    type="checkbox"
                    name="Rental Tax"
                    onChange={handleAdditionalChargeChange}
                  />{" "}
                  Rental Tax: 11.5%
                </label>
              </div>
            </div>
          </div>

          <div className="section col-span-4">
            <div className="charges-summary">
              <h2 className="section-heading">Charges Summary</h2>
              <table>
                <thead>
                  <tr>
                    <th>Charge</th>
                    <th>Unit</th>
                    <th>Rate</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Daily</td>
                    <td>{duration.days}</td>
                    <td>${filteredCar[0]?.rates.daily}</td>
                    <td>${filteredCar[0]?.rates.daily * duration.days}</td>
                  </tr>
                  <tr>
                    <td>Weekly</td>
                    <td>{duration.weeks}</td>
                    <td>${filteredCar[0]?.rates.weekly}</td>
                    <td>${filteredCar[0]?.rates.weekly * duration.weeks}</td>
                  </tr>
                  <tr>
                    <td>Hourly</td>
                    <td>{duration.hours}</td>
                    <td>${filteredCar[0]?.rates.hourly}</td>
                    <td>${filteredCar[0]?.rates.hourly * duration.hours}</td>
                  </tr>
                  {additionalCharges.map((charge, index) => (
                    <tr key={index}>
                      <td>{charge.name}</td>
                      <td colSpan="2"></td>
                      <td>${charge.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total</td>
                    <td colSpan="3">${totalCharges}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
