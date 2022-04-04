import mailBuilder from '@sitevision/api/server/MailBuilder';
import appData from '@sitevision/api/server/appData';

export const sendMail = (title, subject) => {
   const mail = mailBuilder.setSubject(title)
      .setTextMessage(subject)
      .addRecipient(appData.get('email'))
      .build();

   mail.send();
}