import mongoose from "mongoose";
import logger from "../utils/logger";

const connectToDb = () => {
    mongoose.connect(
        process.env.DB_URI,
    ).then((res) => {
        logger.info('Successfully Connected to Database')
    }).catch((error) => {
        logger.error('Error Connecting to Database');
        logger.error(error);
    });
}


export default connectToDb;