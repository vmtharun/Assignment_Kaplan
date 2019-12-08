import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    name: {
        type: String,
        required: 'Enter assignment name',
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: 'Enter title for assignment'
    },
    description: String,
    type: { type: String, enum: ['Daily', 'Weekly', 'Monthly'] },
    duration: {
        type: Number,
        default: 30
    },
    tags: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const assignmentModel = mongoose.model('Assignment', AssignmentSchema);