import mongoose, { Schema, models, model } from "mongoose";

const MediaSchema = new Schema({

    name: {
        type: String
    },
    url: {
        type: String,
        required: [true, "Please provide url"],
        trim: true
    },
    mediaType: {
        type: String,
        enum: ['video', 'photo']
    }
})

MediaSchema.pre("save", function (next) {

    if (!this.url) {
        return next(new Error("URL is required to determine media type."));
    }

    const videoExt = ['.mp4', '.mov', '.webm', '.avi'];
    const photoExt = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];

    const isVideo = videoExt.some(vid => this.url.toLowerCase().endsWith(vid))

    const isPhoto = photoExt.some(photo => this.url.toLowerCase().endsWith(photo))

    if (isVideo) {
        this.mediaType = "video"
        next()
    }
    else if (isPhoto) {
        this.mediaType = "photo"
        next()
    }
    else {
        next(new Error("Unsupported file format. Only images and videos are allowed."))
    }

})

const Media = models.Media || model("Media", MediaSchema);

export default Media;