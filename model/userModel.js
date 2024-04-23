
exports.registerUser = (name, email, password, callback) => {
    let context = "check for user";
    let checkQuery = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;

    // Execute the check dbutil
    dbutil.execQuery(dbconnection, checkQuery, context, [email], (err, rows) => {
        if (err) {
            return callback(err);
        }

        // Check if any user exists with the provided email
        const userExists = rows[0].count > 0;
        if (userExists) {
            return callback(null, { message: "User already exists", code: 409 });
        } else {
            // No user found with the email, proceed with password hashing
            bcrypt.hash(password, 10, (err, hashedPass) => {
                if (err) {
                    return callback(err);
                }

                // Prepare the insert dbutil
                const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

                // Execute the insert dbutil
                dbutil.execQuery(dbconnection, insertQuery, "add new user", [name, email, hashedPass], (error, result) => {
                    if (error) {
                        return callback(error);
                    }

                    // Registration successful
                    return callback(null, { message: "User registered successfully", code: 200 });
                });
            });
        }
    });
};



exports.userLogin = (email, password, callback) => {
    let queryCheckUser = "SELECT * FROM users WHERE email = ?"; // Fetch the whole user row

    dbutil.execQuery(dbconnection, queryCheckUser, "check", [email], (err, rows) => {
        if (err) {
            return callback(err); // Error during database operation
        }

        // Check if user exists
        if (rows.length === 0) {
            return callback(null, { message: "No User Found", code: 400 });
        }

        const user = rows[0]; // Assuming the user data is the first row

        // Compare the hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return callback(err); // Error during password comparison
            }

            if (!isMatch) {
                return callback(null, { message: 'Invalid Password', code: 401 }); // Password does not match
            }

            return callback(null, {  message: 'Login successful', code: 200 });
        });
    });
};

exports.getAllUsers = (callback) => {
    const query = "SELECT * FROM users";
    dbutil.execQuery(dbconnection, query,"allusers",[], (err, results) => {
        if (err) {
            return callback(err);
        }
        const users = results
        console.log(users)
        return callback(null,{users : results});
    });
};
