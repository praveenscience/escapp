const {models} = require("../models");

module.exports = {

    "up": async () => {
        const escapeRooms = await models.escapeRoom.findAll({
            "attributes": ["id"],
            "include": [
                {
                    "model": models.puzzle,
                    "attributes": ["id"]
                }
            ]
        });

        for (const er of escapeRooms) {
            er.puzzles.map(async ({id}, order) => await models.puzzle.update({order}, {"where": {id}}));
        }
    }

};
