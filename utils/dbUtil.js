
exports.execQuery = (conpool, query, context, values, callback) => {
  // console.log(conpool)
  if (callback && typeof callback === "function") {
    conpool.getConnection((err, connection) => {
      if (err) {
        callback(err, null);
        console.log("error connecting to db");
        return;
      }
      console.log("db connection is established");
      connection.query(query, values, (err, rows) => {
        connection.release();
        if (err) {
          console.log("error connection while connecting to db");
          return;
        }
        callback(false, rows);
      });
    });
  }
};