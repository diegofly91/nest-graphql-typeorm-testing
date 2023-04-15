const fs = require('fs');
const path = require('path');

module.exports.getRoleById = fs.readFileSync(path.join(__dirname, 'getRoleById.gql'), 'utf8');
module.exports.getRoles = fs.readFileSync(path.join(__dirname, 'getRoles.gql'), 'utf8');
