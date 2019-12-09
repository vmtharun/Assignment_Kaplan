import { AssignmentService } from "../../../services/AssignmentService"

export class AssignmentController {
    public async addAssignment(req: any) {
        return await AssignmentService.addAssignment(req);
    }

    public async getAssignment(id: string) {
        return await AssignmentService.getAssignmentById(id);
    }

    public async searchAssignmentByTag(tags: string[]) {
        return await AssignmentService.searchAssignmentByTag(tags);
    }
}