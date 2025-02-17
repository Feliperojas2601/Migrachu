import { Model, DataTypes } from '@sequelize/core';
        import { sequelize } from '../config/sequelize';

        class Users extends Model {}

        Users.init({
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
  name: {
            type: DataTypes.STRING,
            
          },
  email: {
            type: DataTypes.STRING,
            
          },
  newField: {
            type: DataTypes.STRING,
            
          }
        }, {
          sequelize,
          modelName: 'users',
          tableName: 'users',
          timestamps: false,
        });

        export { Users };