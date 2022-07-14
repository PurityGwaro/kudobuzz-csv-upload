const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const dotenv = require("dotenv");
const database = require("./database");
const { Customer, File } = require("./models/schema");

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  database._connect();
  console.log(`Listening at Port http://localhost${PORT}`);
});

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED" });
});

app.post("/api/upload", upload.single("csv_file"), (req, res) => {
  let csvData = req.file;
  let fileExtension = csvData.originalname.split(".").pop();
  const file = fs.readFileSync(`${csvData.path}`, {
    encoding: "utf8",
  });

  const arrayOfData = file.replace(/\r/g, "").split("\n");

  const parseArrayOfData = arrayOfData
    .filter((dataRow) => dataRow != "")
    .map((dataRow) => {
      return dataRow.split(",");
    });

  const headers = parseArrayOfData[0];

  parseArrayOfData.shift();

  const processedData = parseArrayOfData.map((dataRow) => {
    const dataObject = {};
    //console.log({ dataRow, headers });
    dataRow.map((data, index) => {
      //assigns each row to its own header
      dataObject[headers[index]] = data;
    });
    return dataObject;
  });

  //Save to mongo db

  const fileInstance = new File({
    name: csvData.originalname,
  });

  fileInstance.save().then((file) => {
    for (let i = 0; i < processedData.length; i++) {
      const saveCustomer = async () => {
        const cust = await Customer.findOne({
          email: processedData[i].email,
          fileId: file.id,
          phone: processedData[i].phone,
        });
        console.log({ cust });
        if (cust == null) {
          console.log("saving customer....");

          const customer = new Customer({
            ...processedData[i],
            ...{ fileId: file.id },
          });
          try {
            const saving = await customer.save();
          } catch (e) {
            console.log("Possible duplicate email or phone");
          }
        }
      };

      saveCustomer();
    }
    // processedData.forEach((data) => {});
  });

  res.json({
    message: "Uploaded",
    data: processedData,
  });
});


app.get("/api/uploads", async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  //console.log(files);
  res.json({
    files,
  });
});

app.get("/api/records/:id", async (req, res) => {
  // const customerData = await Customer.paginate(
  //   {
  //     fileId: req.params.id,
  //   },
  //   {
  //     page: req.query.page || 1,
  //     limit: req.query.perPage || 10,
  //   }
  // ).then((customers) => {
  //   console.log(customers);
  //   return customers;
  // }).catch((err) => {
  //   console.log(err);
  // });
  const customerData = await Customer.find().sort({ createdAt: -1 });
  //console.log(customerData);
  res.json({
    customerData,
  });
});

//delete file
app.delete("/api/uploads/:id", async (req, res) => {
  const file = await File.findById(req.params.id);
  if (file) {
    await Customer.deleteMany({ fileId: req.params.id });
    await File.deleteOne({ _id: req.params.id });
    res.json({
      message: "File deleted",
    });
  } else {
    res.json({
      message: "File not found",
    });
  }
});


//delete customer
app.delete("/api/customer/:id", (req, res) => {
  const id = req.params.id;
  Customer.deleteOne({ _id: id }).then((data) => {
    res.json({
      message: "Deleted",
      data,
    });
  });
});

//edit customer
app.put("/api/customer/:id", async (req, res) => {
  const filter = { id: req.params.id };
  const data = { name: req.body.name, email: req.body.email, phone: req.body.phone };

  //console.log({ filter, data });

  //let doc = await Customer.findOne({ id: req.params.id });
  let doc = await Customer.findByIdAndUpdate(req.params.id, data, {
    upsert: false,
  });
  console.log({ doc });
  
  res.json({
    message: "Updated",
    data: doc,
  });

});


