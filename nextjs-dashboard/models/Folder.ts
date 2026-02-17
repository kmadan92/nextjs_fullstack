import mongoose, { Schema, models, model } from "mongoose";

const FolderSchema = new Schema({

    folderName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    coverImage: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3767/3767084.png"
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
        type: String
    }
},

    {
        timestamps: true
    }

)

FolderSchema.index({ parent: 1 });

const Folder = models.Folder || model("Folder", FolderSchema);

export default Folder;