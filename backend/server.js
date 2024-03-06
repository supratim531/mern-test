const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const handleError = require("./middlewares/errorHandler");

dotenv.config();
const app = express();
const PORT = 8000 || process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("static"));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/employee", require("./routes/employeeRoute"));
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
