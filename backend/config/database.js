const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }).then(res => {
              console.log(`DB Connected!, host: ${res.connection.host}`)
      }).catch(err => {
        console.log(Error, err.message);
      });
}
module.exports = connectDatabase;

