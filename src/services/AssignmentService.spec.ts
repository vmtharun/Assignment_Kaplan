import { AssignmentService } from "./AssignmentService";
import { Error as mongooseErr } from "mongoose";
import * as mockDB from "./../tests/mock-db-handler";
import { HTTP404Error } from './../utils/httpErrors';

const assignmnetObj = {
    name: "new assignment 1",
    title: "new title",
    type: "Daily",
    tags: ["java"]
}

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await mockDB.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await mockDB.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await mockDB.closeDatabase());

describe("Assignment Service:: Test getAssignmentById", () => {
    test("should throw error if _id is not in format", async () => {
        return expect(AssignmentService.getAssignmentById("123")).rejects.toThrow(mongooseErr.CastError);
    });

    test("should throw 404 if no record found", async () => {
        return expect(AssignmentService.getAssignmentById("507f1f77bcf86cd799439011")).rejects.toThrow(HTTP404Error);
    });

    test("should return assignment object", async () => {
        const newAssignment = await AssignmentService.addAssignment(assignmnetObj);
        const assignment: any = await AssignmentService.getAssignmentById(newAssignment.split(':')[1].trim());
        expect(assignment.name).toEqual(assignmnetObj.name);
    });
});

describe("Assignment Service:: Test addAssignment", () => {
    test("should create new Assignment document", async () => {
        const newAssignment = await AssignmentService.addAssignment(assignmnetObj);
        expect(newAssignment).toContain("New Assignment Added with id:");
    });

    test("should throw conflict if name already exists", async () => {
        const newAssignment = await AssignmentService.addAssignment(assignmnetObj);
        return expect(AssignmentService.addAssignment(assignmnetObj)).rejects.toThrowError();
    });
});