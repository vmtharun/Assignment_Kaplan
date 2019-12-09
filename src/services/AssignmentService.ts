import { assignmentModel } from '../dbModels/assignmentModel'
import { notFoundError } from '../utils/ErrorHandler';

export class AssignmentService {
    public static async addAssignment(req: any) {
        let newAssignment = new assignmentModel(req);
        const assignment = await newAssignment.save();
        return `New Assignment Added with id: ${assignment._id}`;
    }

    public static async getAssignmentById(id: string) {
        const assignment = await assignmentModel.findById(id).exec();
        // Throw 404 if no record found
        if (!assignment)
            throw notFoundError("No Assignment found");
        return assignment;
    }

    public static async searchAssignmentByTag(tags: string[]) {
        return await assignmentModel.find().where("tags").in(tags);
    }
}

