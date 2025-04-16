
import { DataTypes } from 'sequelize'; 
import sequelize from '../config/db.js' 

const Book = sequelize.define('Book', {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    book_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    book_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'books',
    timestamps: true // enables createdAt and updatedAt
  });

  export default Book;