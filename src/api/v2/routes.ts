import { Request, Response } from "express";
import { AssignmentV2Controller } from './controllers/assignmentV2Controller'

const assignmentController: AssignmentV2Controller = new AssignmentV2Controller();
export default [
  {
    path: "/assignment/:id",
    method: "get",
    handler: [
      ({ params }: Request, res: Response) => {
        const result = assignmentController.getAssignment(params.id);
        res.status(200).send(result);
      }
    ]
  }
];