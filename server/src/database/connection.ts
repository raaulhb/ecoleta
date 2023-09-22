// import knex from 'knex'
// import path from 'path'

// const connection = knex({
//     client: 'sqlite3',
//     connection: {
//         filename: path.resolve(__dirname, 'database.sqlite')
//     },
//     useNullAsDefault: true,
// })

// export default connection;

import knex from 'knex'
// import path from 'path'
import config from '../../knexfile';

const connection = knex(config.development);

module.exports = connection;