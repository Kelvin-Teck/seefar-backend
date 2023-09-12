import mongoose from "mongoose";

export const connectDB = async () => {

  try {
    const CONNECTION = process.env.MONGO_URI_PRODUCTION || process.env.MONGO_URI;
    console.log(CONNECTION)

    mongoose.set("strictQuery", false);
    await mongoose.connect(CONNECTION, {
      dbName: "seefar",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected successfully...");
  } catch (error) {
    console.log(`database connection error => ${error.message} ${error}` );
  }
};
