import router from '@sitevision/api/common/router';
import events from '@sitevision/api/server/events';
import mailBuilder from '@sitevision/api/server/MailBuilder';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import logUtil from '@sitevision/api/server/LogUtil';
import * as dataStoreProvider from './utils/dataStoreProvider';
import propertyUtil from '@sitevision/api/server/PropertyUtil';


let feedbackHTMLMessage = (feedbackObject) => {
  return '<div style=" background-color: #80c5ff; height:100%; margin: 10px; border-radius: 5px; padding: 20px;">' +
    '<h2 style="text-align: center; font-size:30px; color: white;"> Meddelande från Filips CSSD sida </h2>' +
    '<div style="color: white; text-align: center; font-size:14px; height: 200px; background-color:#004a90; padding: 20px; border: 1px solid white;">' +
    '<p style="color: white;">' + 'Sidan med namnet: ' + feedbackObject.feedbackPage + ' har fått feedback. </p>' +
    '<p style="color: white;">Publicerad feedback: "' + feedbackObject.message + '"</p> ' +
    '<a style="color: white;" href="' + feedbackObject.feedbackPageURL + '" >Läs mer på Filips Sitevision sida -> </a>' +
    '</div>' +
    '</div>';
};

let makeFeedbackOutdated = (page) => {
  let feedback = dataStoreProvider.getPrevSearches();
  feedback.forEach(f => {
    if (f.feedbackPage == page) {
      if (!f.isOutdated) {
        f.isOutdated = true;
        dataStoreProvider.update(f.dsid, f);
      }
    }
  })
}

let sendMail = (feedback) => {
  if (feedback) {
    const mail = mailBuilder.setSubject("Sidan " + feedback.feedbackPage + " har fått feedback.")
      .setHtmlMessage(feedbackHTMLMessage(feedback))
      .addRecipient("filip.huhta@consid.se")
      .build();
    mail.send();
  }
}

router.get('/getFeedback', (req, res) => {
  let feedback = dataStoreProvider.getPrevSearches();
  res.status(200).json({ data: feedback });
});

router.post('/addFeedback', (req, res) => {
  let feedback = dataStoreProvider.add(req.params.value);
  sendMail(feedback);
  if (feedback) {
    res.status(200).json({ data: feedback });
  }
});

events.on('sv:publishing:publish', (options) => {
  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);
  makeFeedbackOutdated(propertyUtil.getString(page, "displayName"));
});

