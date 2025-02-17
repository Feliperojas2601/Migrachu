import { Model, DataTypes } from '@sequelize/core';
        import { sequelize } from '../config/sequelize';

        class Users extends Model {}

        Users.init({
            id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: DataTypes.STRING
        }, {
          sequelize,
          modelName: 'users',
          tableName: 'users',
          timestamps: false,
        });

        export { Users };