import { Request, Response } from "express";
import { AssignmentController } from './controllers/assignmentController'

const assignmentController: AssignmentController = new AssignmentController();

/* Instead of passing whole Request and Rsponse to the controller,
just passing the required params, so that its easily testable */
export default [
  {
    path: "/assignment",
    method: "post",
    handler: [
      async ({ body }: Request, res: Response) => {
        const result = await assignmentController.addAssignment(body);
        res.status(201).send(result);
      }
    ]
  },
  {
    path: "/assignment/search",
    method: "get",
    handler: [
      async ({ body }: Request, res: Response) => {
        const result = await assignmentController.searchAssignmentByTag(body.tags);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/assignment/:id",
    method: "get",
    handler: [
      async ({ params }: Request, res: Response) => {
        const result = await assignmentController.getAssignment(params.id);
        res.status(200).send(result);
      }
    ]
  }
];