import app from "./app.js";
import databaseConnection from "./db/databaseConnection.js";

const port = process.env.PORT || 3000;

databaseConnection().then(() => {
  app.on("error", (err) => console.log("Express Runtime Error: ", err));
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
