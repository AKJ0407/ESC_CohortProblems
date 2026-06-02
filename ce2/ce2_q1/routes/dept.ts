import express, { Router, Request, Response, NextFunction } from 'express';
import * as deptmodel from '../models/dept';
import * as staffmodel from '../models/staff';

const router: Router = express.Router();

// TODO 1: ADD dept into database
router.get('/add/:code', async function(req: Request, res: Response, next: NextFunction) {
try {
        const code = req.params.code;
        const newDept = new deptmodel.Dept(code);
        
        // Use the insertMany function in /models/dept.ts
        await deptmodel.insertMany([newDept]);
        
        // Return the exact JSON required; { "code": "hr" }
        res.json({ code: newDept.code });
    } catch (error) {
        next(error);
    }
});

// TODO 3: Find all departments
router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
try {
        const depts = await deptmodel.all();
        res.json(depts);
    } catch (error) {
        next(error);
    }
});

// TODO 5: Find all departments with staffs
router.get('/all/withstaff/', async function(req: Request, res: Response, next: NextFunction) {
try {
        // Uses the added function in /models/dept.ts
        const result = await deptmodel.allWithStaff();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;