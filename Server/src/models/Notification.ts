import mongoose, { Document, Schema } from "mongoose";
import User from "../models/user";


export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    title: string,
    message: string,
    type: 'BATCH_ASSIGN' | 'LOGIN' | 'MEETING_CREATE' | 'HACKATHON_CREATE',
    createdAt: Date,
    isRead: Boolean,
    link?: string;
    emailSent?: boolean;    
    emailSentAt?: Date; 
}


const NotificationSchema: Schema = new Schema<INotification>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['BATCH_ASSIGN', 'LOGIN', 'MEETING_CREATE', 'HACKATHON_CREATE'],
        required: true,
    }, 
    link: {
    type: String,
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    emailSent: {
        type: Boolean,
        default: false,
    },
    emailSentAt: {
        type: Date,
    },

});

export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);

