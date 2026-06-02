import express, { Router, Request, Response, NextFunction } from 'express';
import * as staffmodel from '../models/staff';
import * as deptmodel from '../models/dept';

const router: Router = express.Router();


/* insert a staff, should have used POST instead of GET */
// TODO 2: ADD staff into database
router.get('/add/:id/:name/:code', async function(req: Request, res: Response, next: NextFunction) {
try {
        const { id, name, code } = req.params;
        
        // Pass 'code' into the 'dept_code' parameter of the Staff constructor
        const newStaff = new staffmodel.Staff(id, name, code);
        
        // Insert it into the database (insertMany expects an array)
        await staffmodel.insertMany([newStaff]);
        
        // Format into the exact JSON structure required
        res.json({
            id: newStaff.id,
            name: newStaff.name,
            dept: newStaff.dept 
        });
    } catch (error) {
        next(error);
    }
});

/* GET staff listing. */
// TODO 4: Find all staffs
router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
try {
        // Fetch all staff using the model's all() function
        const staffs = await staffmodel.all();
        
        // The model already formats this as an array of Staff objects,
        // so just pass it directly to res.json()
        res.json(staffs);
    } catch (error) {
        next(error);
    }
});

export default router;