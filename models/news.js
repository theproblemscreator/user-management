import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const News = sequelize.define('News', {
  news_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  news_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  news_desc: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'news',
  timestamps: true // adds createdAt and updatedAt automatically
});

export default News;