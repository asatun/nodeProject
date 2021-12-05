const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MONGODB is Connected Successfully at  :${connection.connection.host} `)
    } catch (e) {
        console.log(e);
        process.exit(1);
    }

}

module.exports = connectDB;

//{
 //   useNewUrlParser: true,
  //  useUnifiedUrlParser: true,
  //  useFindAndModify: false,
  //  useCreateindex: true,


//}