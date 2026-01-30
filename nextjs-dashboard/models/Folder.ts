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
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder"
    },
    takenAt: {
        type: Date,
        required: true
    }
},

    {
        timestamps: true
    }

)

FolderSchema.index({ parent: 1 });

const Folder = models.Folder || model("Folder", FolderSchema);

export default Folder;