import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditCustomer() {

    const { REACT_APP_API_BASE_URL } = process.env;
    const [customer, setCustomer] = useState([]);

    const { id } = useParams();

    const handleChange = (e) => {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
  }

   // change values in the form to the values edited on the form by the user
    const handleEdit = (e) => {
      console.log(id);
        e.preventDefault();
        axios
            .put(`${REACT_APP_API_BASE_URL}/customer/${id}`)
            .then(({ data, status }) => {
                if (status === 200) {
                    setCustomer(data);
                }
            }
            ).catch(err => console.log(err));
        //go back to the previous page
        window.history.back();
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body">
            <form
              onSubmit={handleEdit}
            >
              <h2>Input changes: </h2>
              <div className="form-group mt-4">
                <div className="form-group mt-4">
                    <label>Name: </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="name"
                      value={customer.name}
                    />
                </div>
                <div className="form-group mt-4">
                    <label>Email: </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="email"
                      value={customer.email}
                    />
                </div>
                <div className="form-group mt-4">
                    <label>Phone: </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="phone"
                      value={customer.phone}
                    />
                </div>
              </div>
              <Button type="submit" className="btn btn-primary w-100 mt-4">
                Edit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
