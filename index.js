const express = require ("express");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require ("mongoose");
const AuthRouter = require('./routes/AuthRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const multer = require('multer');

const PORT = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
// app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use('/api/user', AuthRouter);
app.use("/api/upload", upload.single("img"), uploadRouter);
// app.use('/api/check', (req, res) => {
//   res.json({ msg: `hello its work` })
// })

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(
    app.listen(PORT, () =>
      console.log(`DB was connected and server run on ${PORT}`)
    )
  )
  .catch((err) => console.log(err));    


