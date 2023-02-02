const mongoose = require('mongoose');



mongoose.set('strictQuery', false);
const Connectmognoose = async () => {
    try {
       mongoose.connect(process.env.DATA_BASE_URL)
     } catch (error) {
       return console.log(error);
     }
}


module.exports = Connectmognoose