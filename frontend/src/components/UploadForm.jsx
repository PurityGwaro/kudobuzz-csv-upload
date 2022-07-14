import axios from "axios";
import React from "react";

export default function UploadForm() {
  const { REACT_APP_API_BASE_URL } = process.env;

  const [file, setFile] = React.useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadFile = (e) => {
    //console.log({ REACT_APP_API_BASE_URL });
    e.preventDefault();

    const formData = new FormData();

    formData.append("csv_file", file);//appends data to an object(formData)

    axios
      .post(`${REACT_APP_API_BASE_URL}/upload`, formData)
      .then((res) => {
        console.log(res);
        //go back to the home page
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 400) {
          alert("Only .csv files are allowed. Try again.");
        }
      });
    
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body">
            <form
              onSubmit={uploadFile}
              action="/uploadfile"
              encType="multipart/form-data"
              method="post"
            >
              <div className="form-group">
                <input type="text" className="form-control" />
              </div>
              <div className="form-group mt-4">
                <input
                  onChange={handleChange}
                  type="file"
                  name="uploadfile"
                  accept="csv"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
