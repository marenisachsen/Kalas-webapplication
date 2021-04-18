var mysql = require("mysql");

var connect_db = mysql.createConnection({
  host: "mysql.stud.ntnu.no",
  user: "victorph_database",
  password: "kalas123",
  database: "victorph_kalas_database"
});

connect_db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql.stud.ntnu.no!");
});

module.exports = {
    add_admin: function add_admin(Username, Password) {
        var sql = "INSERT INTO Admin (Username, Password) VALUES ('" + Username + "', '" + Password + "')";
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Admin added to database');
        });
    },

    add_user: function add_user(Username, Password, Birthyear, Name) {
        var sql = "INSERT INTO User (Username, Password, Birthyear, Name) VALUES ('" + Username + "', '" + Password + "', " + parseInt(Birthyear) + ", '" + Name + "')";
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('User added to database');
        });
    },

    add_kalas_host: function add_kalas_host(NumberOfPersons, StartTime, EndTime, Address, Capacity, Title, Description, Username, PhoneNumber) {
        var sql = "INSERT INTO Kalas (Numberofpersons, StartTime, EndTime, Address, Capacity, Title, Description, PhoneNumber, Host) VALUES (" + NumberOfPersons + ", '" + StartTime + "', '" + EndTime + "', '"+ Address + "', " + Capacity + ", '" + Title + "', '" + Description + "', '" + PhoneNumber + "', True);"
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Host added');
            last_key = result.insertId;
            var userSQL = "UPDATE User SET KalasID = " + last_key + " WHERE Username = '" + Username + "'";
            connect_db.query(userSQL, function (err, result) {
                if (err) throw err;
                console.log('User updated');
            });
        });
    },

    add_kalas_seeker: function add_kalas_seeker(NumberOfPersons, Title, Description, Username) {
        var sql = "INSERT INTO Kalas (NumberOfPersons, Title, Description) VALUES (" + NumberOfPersons + ", '" + Title + "', '" + Description + "')";
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Host added');
            last_key = result.insertId;
            var userSQL = "UPDATE User SET KalasID = " + last_key + " WHERE Username = '" + Username + "'";
            connect_db.query(userSQL, function (err, result) {
                if (err) throw err;
                console.log('User updated');
            });
        });
    },

    update_kalas: function update_kalas(NumberOfPersons, StartTime, EndTime, Address, Capacity, Title, Description, PhoneNumber, Host, KalasID) {
        var sql = "UPDATE Kalas SET Numberofpersons = " + NumberOfPersons + ", " + 
        "StartTime = " + StartTime + ", " +
        "EndTime = " + EndTime + ", " +
        "Address = '" + Address + "', " +
        "Capacity = " + Capacity + ", " +
        "Title = '" + Title + "', " +
        "Description = '" + Description + "', " +
        "PhoneNumber = " + PhoneNumber + ", " +
        "Host = " + Host + 
        "WHERE KalasID = " + KalasID + ";"
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Kalas uppdated');
        });
    },

    check_login_user: function check_login_user(Username, Password, callback) {
        var sql = "SELECT Username FROM User WHERE USERNAME = '" + Username + "' AND Password = '" + Password + "'";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            } 
            var isValidLogin = Boolean(result.length == 1);
            callback(null, isValidLogin);
        });
    },

    check_login_admin: function check_login_admin(Username, Password, callback) {
        var sql = "SELECT Username FROM Admin WHERE USERNAME = '" + Username + "' AND Password = '" + Password + "'";
        connect_db.query(sql, function (err, result){
            if (err){
                callback(err, null);
            }
            var isValidLogin = Boolean(result.length == 1);
            callback(null, isValidLogin);
        });
    },

    get_kalas_info: function get_kalas_info(Username, callback) {
        var sql = "SELECT Numberofpersons, StartTime, EndTime, Address, Capacity, Title, Description, PhoneNumber, Host FROM Kalas NATURAL JOIN User WHERE Username = '" + Username + "'";
        connect_db.query(sql, function (err, result){
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

    get_all_kalas_hosts: function get_all_kalas_hosts(callback) {
        var sql = "SELECT * FROM Kalas WHERE Host = 1"
        connect_db.query(sql, function (err, result){
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

    admin_get_all_kalas: function admin_get_all_kalas(callback) {
        var sql = "SELECT Username, PhoneNumber, KalasID, Address, Capacity, StartTime, EndTime, Description, Host, Numberofpersons, Title FROM Kalas NATURAL JOIN User";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

    delete_kalasID: function delete_kalasID(KalasID) {
        var sql = "DELETE FROM Kalas WHERE KalasID = " + KalasID;
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Kalas deleted')

        });
    },

    get_usernames: function get_usernames(callback) {
        var sql = "SELECT Username FROM User";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

    admin_get_users: function admin_get_users(callback) {
        var sql = "SELECT * FROM User";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

  get_usernames: function get_usernames(callback) {
    var sql = "SELECT Username FROM User";
    connect_db.query(sql, function(err, result) {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  },

  get_users: function get_users(callback) {
    var sql = "SELECT * FROM User";
    connect_db.query(sql, function(err, result) {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  },

  delete_kalas: function delete_kalas(Username) {
    var sql =
      "DELETE Kalas.* from Kalas INNER JOIN User ON Kalas.KalasID = User.KalasID WHERE User.Username = '" +
      Username +
      "'";
    connect_db.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Kalas Deleted");
    });
  },

  delete_user: function delete_user(Username) {
    this.delete_kalas(Username);
    var sql = "DELETE FROM User WHERE Username = '" + Username + "'";
    connect_db.query(sql, function(err, result) {
      if (err) throw err;
      console.log("User deleted");
    });
  },

    delete_user: function delete_user(Username) {
        this.delete_kalas(Username);
        var sql = "DELETE FROM User WHERE Username = '" + Username + "'";
        connect_db.query(sql,function (err, result) {
            if (err) throw err;
            console.log("User deleted");
        });
    },

    add_kalas_request: function add_kalas_request(UsernameSeeker, KalasID) {
        var sql = "INSERT INTO SeekerOfKalas (KalasID, Username) VALUES (" + KalasID + ", '" + UsernameSeeker + "')";
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Kalas request added');
        });
    },

    delete_kalas_request: function delete_kalas_request(UsernameSeeker, KalasID) {
        this.delete_kalas(Username);
        var sql = "DELETE FROM SeekerOfKalas WHERE Username = '" + UsernameSeeker + "'" + "AND KalasID = " + KalasID + ")";
        connect_db.query(sql,function (err, result) {
            if (err) throw err;
            console.log("kalas request deleted");
        });
    },

    get_seekers_to_my_kalas: function get_seekers_to_my_kalas(Username, callback) {
        var sql1 = "SELECT KalasID FROM User WHERE Username = '" + Username + "')";
        connect_db.query(sql1, function (err, result1) {
            if (err){
                callback(err, null);
            }
            else if (result1.KalasID){
                var sql2 = "SELECT Username FROM SeekerOfKalas WHERE KalasID = " + result1.KalasID;
                connect_db.query(sql2, function (err, result2) {
                    if (err){
                        callback(err, null);
                    }
                    callback(null, result2);
                });
            }
            else {
                console.log("User has no kalas")
            }
        });
    },

    get_my_kalas_requests: function get_my_kalas_requests(Username, callback) {
        var sql = "SELECT Username FROM SeekerOfKalas WHERE Username = '" + Username + "')";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

    add_kalas_member: function add_kalas_member(UsernameSeeker, KalasID) {
        var sql = "INSERT INTO MemberOfKalas (KalasID, Username) VALUES (" + KalasID + ", '" + UsernameSeeker + "')";
        connect_db.query(sql, function (err, result) {
            if (err) throw err;
            console.log('Kalas member added');
        });
    },

    get_my_kalasID: function get_my_kalasID(Username, callback) {
        var sql = "SELECT KalasID FROM User WHERE Username = '" + Username + "')";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            }
            callback(null, result.KalasID);
        });
    },

    get_my_member_of_kalas: function get_my_member_of_kalas(Username, callback) {
        var sql = "SELECT KalasID FROM MemberOfKalas WHERE Username = '" + Username + "')";
        connect_db.query(sql, function (err, result) {
            if (err){
                callback(err, null);
            }
            callback(null, result);
        });
    },

    close_connection_database: function close_connection_database() {
        connect_db.end();
    }
};
