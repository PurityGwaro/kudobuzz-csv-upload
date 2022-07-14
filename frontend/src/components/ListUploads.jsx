import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ListUploads() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("useEffect fired");
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uploads`)
      .then(({ data, status }) => {
        if (status === 200) {
          setFiles(data.files);
        }
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);
  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/uploads/${id}`);
    setFiles(files.filter((file) => file.id !== id));
    //refresh page
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right" align="right">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => {
                return (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td>{file.createdAt}</td>
                    <td>
                      <Link
                        to={`/csv/${file._id}`}
                        className="btn float-right btn-primary btn-sm "
                      >
                        view
                      </Link>
                      <Button
                        onClick={() => handleDelete(file._id)}
                        className="btn float-right btn-danger btn-sm"
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
