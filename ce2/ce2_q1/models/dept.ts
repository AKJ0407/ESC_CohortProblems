import { db } from './db';
import { Filter, Document } from 'mongodb';

const collectionName = 'dept'

export class Dept {
    code: string;

    constructor(code: string) {
        this.code = code;
    }
}

export async function all(): Promise<Dept[]> {
    const depts = await find({});
    return depts;
}

export async function find(p: Filter<Document>): Promise<Dept[]> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        const cursor = collection.find(p);
        const depts: Dept[] = [];
        while (await cursor.hasNext()) {
            const dbobj = await cursor.next();
            if (dbobj) {
                const dept = new Dept(dbobj.code as string);
                depts.push(dept);
            }
        }
        return depts;
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

export async function insertMany(depts: Dept[]): Promise<void> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        await collection.insertMany(depts);
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}

// Added function for last requirement of dept with staff
export async function allWithStaff(): Promise<any[]> {
    try {
        if (!db) throw new Error("Database not initialized");
        const collection = db.collection(collectionName);
        
        // Use aggregate to perform a $lookup (join) with the staff collection
        const cursor = collection.aggregate([
            {
                $lookup: {
                    from: 'staff', //Must be same as staff's collection name
                    localField: 'code',
                    foreignField: 'dept',
                    as: 'staffs'
                }
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    'staffs.id': 1,
                    'staffs.name': 1,
                    'staffs.dept': 1
                }
            }
        ]);
        
        return await cursor.toArray();
    } catch(error) {
        console.error("database connection failed." + error);
        throw error;
    } 
}