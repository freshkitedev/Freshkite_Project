import { NotificationModel } from '../models/Notification';
import { sendEmail } from '../utils/emailSender'

interface NotifyUsersProps {
  userIds: string[];
  title: string;
  message: string;
  type: 'BATCH_ASSIGN' | 'LOGIN' | 'MEETING_CREATE' | 'HACKATHON_CREATE';
  emailRequired?: boolean;
  emailData?: {
    subject: string;
    usersData: any[];
    getEmailForUser: (user: any) => string;
    generateHtml: (user: any) => string;
  };
}

export class NotificationService {
  static async notifyUsers({
    userIds,
    title,
    message,
    type,
    emailRequired = false,
    emailData,
  }: NotifyUsersProps) {
    //Save Notifications in DB
    const notifications = userIds.map(userId => ({
      userId,
      title,
      message,
      type,
      createdAt: new Date(),
      isRead: false,
    }));

    await NotificationModel.insertMany(notifications);

    //Send Emails if required
    if (emailRequired && emailData) {
      const emailPromises = emailData.usersData.map(async (user) => {
        const userEmail = emailData.getEmailForUser(user);
        const emailHtml = emailData.generateHtml(user);

        await sendEmail({
          to: userEmail,
          subject: emailData.subject,
          html: emailHtml,
        });

        //Optional: Update emailSent field in DB
        await NotificationModel.updateOne(
          { userId: user._id, type },
          { $set: { emailSent: true, emailSentAt: new Date() } }
        );
      });

      await Promise.all(emailPromises);
    }
  }
}
