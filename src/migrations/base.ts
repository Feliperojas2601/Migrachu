import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import csv from 'csv-parser';

export abstract class BaseMigration {
    abstract up(): Promise<void>;

    abstract down(): Promise<void>;

    async getExcelData(fileName: string): Promise<any> {
        const filePath = path.join(__dirname, '../tmp', fileName + '.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return await xlsx.utils.sheet_to_json(sheet);
    }

    async getCSVData(fileName: string): Promise<any> {
        const filePath = path.join(__dirname, '../tmp', fileName + '.csv');
        const data: any[] = [];
        return await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row: any) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (error: any) => reject(error));
        });
    }

    async getJSONData(fileName: string): Promise<any> {
        const filePath = path.join(__dirname, '../tmp', fileName + '.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    }
}