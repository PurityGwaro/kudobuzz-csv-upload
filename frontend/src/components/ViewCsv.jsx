import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CustomPagination from "./Pagination";

export default function CustomerUI() {
  let { id } = useParams();
  const [customers, setCustomers] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const { REACT_APP_API_BASE_URL } = process.env;
  useEffect(() => {
    let page = searchParams.get("page") || 1;
    let limit = searchParams.get("limit") || 10;
    axios
      .get(
        `${REACT_APP_API_BASE_URL}/records/${id}?page=${page}&perPage=${limit}`
      )
      .then(({ data, status }) => {
        if (status === 200) {
          const customerDataResponse = JSON.parse(
            JSON.stringify(data.customerData)
          );

          delete customerDataResponse["docs"];
          setPaginationData(customerDataResponse);
          setCustomers(data.customerData?.docs);
        }
      });
  }, [id, searchParams]);
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${REACT_APP_API_BASE_URL}/customer/${id}`)
      .then(({ data, status }) => {
        if (status === 200) {
          setCustomers(customers.filter((customer) => customer.id !== id));
        }
      }).catch(err => console.log(err));
      //reload page
      window.location.reload();
  }

  // const handleEdit = (id) => {
  //   window.location.href = `/edit/${id}`;
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                return (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.createdAt}</td>
                    <td>
                      {/* edit button */}
                      <Link to={`/edit/${customer._id}`} className="btn float-right btn-primary btn-sm">
                        edit
                      </Link>
                      {/* <Button variant="primary" onClick={() => handleEdit(customer.id)}>
                        Edit
                      </Button> */}
                      <Button  onClick={()=> handleDelete(customer._id)} variant="danger" className="float-right btn-sm">
                        delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mb-2">
            <CustomPagination paginationData={paginationData} />
          </div>
        </div>
      </div>
    </div>
  );
}
