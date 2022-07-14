import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CustomPagination from "./Pagination";

export default function CustomerUI() {
  const pageCurrent = window.localStorage.getItem('currentPage') || 1;
  console.log({pageCurrent});

  const handleAdjustPage = (page, customerData) => {
    setCurrentPage(page);
    setCurrentTen(customerData.slice((page-1)*10, page*10));
    window.localStorage.setItem('currentPage', page);
    console.log({page});
  } 

  let { id } = useParams();
  
  
  const [customers, setCustomers] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [currentTen, setCurrentTen] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageCurrent);

  const { REACT_APP_API_BASE_URL } = process.env;
  useEffect(() => {
    
    axios
      .get(
        `${REACT_APP_API_BASE_URL}/records/${id}`
      )
      .then(({ data, status }) => {
        if (status === 200) {
          const customerDataResponse = JSON.parse(
            JSON.stringify(data.customerData)
          );

          delete customerDataResponse["docs"];
          setPaginationData(customerDataResponse);
          setCustomers(data.customerData);
          handleAdjustPage(currentPage, data.customerData);
          //setCurrentTen(data.customerData.slice(0, limit));
          //console.log(data.customerData);
          console.log(currentTen)
        }
      });
  }, [id, currentPage]);

  const handleDelete = (id) => {
    //console.log(id);
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
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {currentTen.map((customer, index) => {
                return (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.createdAt}</td>
                    <td>
                      {/* edit button */}
                      <Link 
                      // to={`/edit/${customer._id}`} 
                      to={{
                        pathname: `/edit/${customer._id}?name=${customer.name}&phone=${customer.phone}&email=${customer.email}`,
                        state: {
                          customer: customer
                        },
                        query: {
                          name: customer.name,
                          email: customer.email,
                          phone: customer.phone,
                        }
                      }}
                      className="btn float-right btn-primary btn-sm" 
                      >
                        edit
                      </Link>
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
            <CustomPagination total={customers.length} perPage={10} currentPage={currentPage} handleOnAdjustPage={handleAdjustPage} />
          </div>
          <Link to='/' className="btn btn-primary">
            Back
          </Link>

        </div>
      </div>
    </div>
  );
}
