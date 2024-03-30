import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-3">
            <div className="section">
              <h2 className="section-heading">Reservation Details</h2>
              <label className="form-label" htmlFor="reservation-id">
                Reservation ID
              </label>
              <input
                type="text"
                id="reservation-id"
                name="reservation-id"
                className="input-field"
              />

              <label className="form-label" htmlFor="pickup-date">
                Pickup Date*
              </label>
              <input
                type="text"
                id="pickup-date"
                name="pickup-date"
                placeholder="Select Date and Time"
                className="input-field"
              />

              <label className="form-label" htmlFor="return-date">
                Return Date*
              </label>
              <input
                type="text"
                id="return-date"
                name="return-date"
                placeholder="Select Date and Time"
                className="input-field"
              />

              <label className="form-label" htmlFor="duration">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value="1 Week 1 Day"
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
              />
            </div>
            <div className="section mt-3">
              <h2 className="section-heading">Vehicle Information</h2>
              <label className="form-label" htmlFor="vehicle-type">
                Vehicle Type*
              </label>
              <select
                id="vehicle-type"
                name="vehicle-type"
                className="input-field"
              >
                <option value="">Select Vehicle Type</option>
              </select>

              <label className="form-label" htmlFor="vehicle">
                Vehicle*
              </label>
              <select id="vehicle" name="vehicle" className="input-field">
                <option value="">Select Vehicle</option>
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
              />
              <label className="form-label" htmlFor="last-name">
                Last Name<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="last-name"
                name="last-name"
                className="input-field"
              />
              <label className="form-label" htmlFor="email">
                Email<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="email"
                name="email"
                className="input-field"
              />
              <label className="form-label" htmlFor="phone">
                Phones<span className=" text-red-700">*</span>
              </label>

              <input
                type="text"
                id="phone"
                name="phone"
                className="input-field"
              />
            </div>
            <div className="section mt-3">
              <h2 className="section-heading">Additional Charges</h2>
              <div className="checkbox-container">
                <label className="form-label">
                  <input type="checkbox" value="9.00" /> Collision Damage
                  Waiver: $9.00
                </label>
                <label className="form-label">
                  <input type="checkbox" /> Liability Insurance: $15.00
                </label>
                <label className="form-label">
                  <input type="checkbox" /> Rental Tax: 11.5%
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
                    <td>1</td>
                    <td>$99.00</td>
                    <td>$99.00</td>
                  </tr>
                  <tr>
                    <td>Weekly</td>
                    <td>1</td>
                    <td>$390.00</td>
                    <td>$390.00</td>
                  </tr>
                  <tr>
                    <td>Collision Damage Waiver</td>
                    <td></td>
                    <td>$9.00</td>
                    <td>$9.00</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>$498.00</td>
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
