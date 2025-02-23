import { sequelize } from '../config/sequelize';
import { Users } from '../models/users';
import { BaseMigration } from './base';
import { QueryTypes } from '@sequelize/core';

export class MyFirstMigration extends BaseMigration {
    async up() {
        console.log('Running my first migration');
        const excelData = await this.getExcelData('excelData');
        console.log('Excel data:', excelData);
        const csvData = await this.getCSVData('csvData');
        console.log('CSV data:', csvData);
        const jsonData = await this.getJSONData('jsonData');
        console.log('JSON data:', jsonData);
        const user: any = jsonData[0];
        await Users.create({
            id: user.id,
            name: user.name,
            email: user.email || 'jhondoe@email.com',
            newField: 'new value',
        });
        const createdUser = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT });
        console.log('Created user:', createdUser);
    }

    async down() {
        console.log('Rolling back my first migration');
        await Users.destroy({ where: { id: 1 } });
        const deletedUser = await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT });
        console.log('Deleted user:', deletedUser);
    }
}