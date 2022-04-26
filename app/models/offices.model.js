const sql = require("./db.js");

// define constructor
const Offices = function(office){
    this.officeCode = office.officeCode;
    this.city = office.city;
    this.phone = office.city;
    this.addressLine1 = office.addressLine1;
    this.addressLine2 = office.addressLine2;
    this.state = office.state;
    this.country = office.country;
    this.postalCode = office.postalCode;
    this.territory = office.territory;
}

Offices.create = (newOffice, result) => {
    sql.query("INSERT INTO offices SET ?", newOffice, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Offices: ", { ...newOffice });
        result(null, { ...newOffice });
    });
};

Offices.findByOfficeCode = (code, result) => {
    sql.query(`SELECT * FROM offices WHERE officeCode = ${code}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found office: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found office with the id
        result({ kind: "not_found" }, null);
    });
};

Offices.getAll = (result) => {
    let query = "SELECT * FROM Offices";
    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("Officess: ", res);
        result(null, res);
    });
};

Offices.updateByOfficeCode = (officeCode, office, result) => {
    sql.query(
        "UPDATE offices SET city = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, state = ?, country = ?, postalCode = ?, territory = ? WHERE officeCode = ?",
        [office.city, office.phone, office.addressLine1, office.addressLine2, office.state, office.country, office.postalCode, office.territory,  officeCode],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found office with the officeCode
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated offices: ", { ...office });
            result(null, { officeCode: officeCode, ...office });
        }
    );
};

Offices.remove = (officeCode, result) => {
    sql.query("DELETE FROM offices WHERE officeCode = ?", officeCode, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Office with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted office with officeCode: ", officeCode);
        result(null, res);
    });
};

Offices.removeAll = result => {
    sql.query("DELETE FROM Offices", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} offices`);
        result(null, res);
    });
};


module.exports = Offices;

