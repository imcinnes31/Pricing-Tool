// These are functions used to populate requrests for counselors by location
const counselor = require("../database/models/counselor");

function get_province_list() {
    counselor.distinct("province", { in_person: true }).then((ans) => {
            console.log(ans); //this works
            return ans; //this does not, returns "undefined"
        }).catch((err) => {
            console.log(err.Message);
    });
}

function get_city_list(province_selected) {
    counselor.distinct("city", { in_person: true, province: province_selected }).then((ans) => {
        console.log(ans); //this works
        return ans; //this does not, returns "undefined"
    }).catch((err) => {
        console.log(err.Message);
    });
}

module.exports = {get_province_list, get_city_list}