export type MailerRequest = {
  from: string;
  to: string;
  subject: string;
  attachments?: any[];
  html: string;
};
