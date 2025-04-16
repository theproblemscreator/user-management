
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

const dbName = 'globalbook';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
};

const createDatabaseIfNotExists = async () => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database '${dbName}' created or already exists.`);
    } catch (error) {
        console.error('Error creating database:', error.message);
    } finally {
        await connection.end();
    }
};

const sequelize = new Sequelize(dbName, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
});

// Synchronize the database and its models
const syncDatabase = async () => {
    await sequelize.sync({ force: false }); 
};

// Main function to initialize the database
const initDatabase = async () => {
    await createDatabaseIfNotExists(); // Ensure the database exists
    await syncDatabase(); // Sync the database
};

// Start the initialization process
initDatabase()
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Error synchronizing database:', err));

// Authenticate the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the MySQL database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the MySQL database:', error);
    }
})();

export default sequelize;
