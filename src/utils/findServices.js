/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
/* eslint-disable padded-blocks */
const services = {
    passenger: "Пассажирские перевозки",
    cargo: "Грузоперевозки",
    tow: "Эвакуатор",
};

function findServices(keys) {
    let result = [];

    for (const a in services) {
        keys.map((item, i) => {
            result.push(item === a && services[item]);
        }).join(", ");
    }
    return result;

}

export default findServices;
