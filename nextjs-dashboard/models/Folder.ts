import mongoose, { Schema, models, model } from "mongoose";

const FolderSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        default: "something"
    },
    fileStructure: {
        type: String,
        required: true
    },
    MemoryTimestamp: {
        type: Date,
        required: true
    },
    tags: {
        type: Array<String>
    }
},

    {
        timestamps: true
    }

)

FolderSchema.index({ parent: 1 });

const Folder = models.Folder || model("Folder", FolderSchema);

export default Folder;