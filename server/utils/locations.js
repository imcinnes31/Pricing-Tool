// These are functions used to populate requrests for counselors by location
const counselor = require("../database/models/counselor");

async function get_province_list() {
    const data = await counselor.distinct("province", { in_person: true });
    return data;
}

async function get_city_list(province_selected) {
    const data = await counselor.distinct("city", { in_person: true, province: province_selected });
    return data;
}

/*
// this will get the data needed to populate the province dropdown menu
const provinceData = await locationFunctions.get_province_list();

// this will get the data needed to populate the city dropdown menu once a province is selected
const cityData = await locationFunctions.get_city_list(province_selected);
*/

module.exports = {get_province_list, get_city_list}