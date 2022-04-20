import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import properties from '@sitevision/api/server/Properties';
import events from '@sitevision/api/server/events';
import mailBuilder from '@sitevision/api/server/MailBuilder';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import logUtil from '@sitevision/api/server/LogUtil';
import * as dataStoreProvider from './utils/dataStoreProvider';
import propertyUtil from '@sitevision/api/server/PropertyUtil';


let feedbackHTMLMessage = (feedbackObject) => {
  return '<div style=" background-color: #80c5ff; height:100%; margin: 10px; border-radius: 5px; padding: 20px;">' +
    '<h2 style="text-align: center; font-size:30px; color: white;"> Message from Filips Sitevision site </h2>' +
    '<div style="color: white; text-align: center; font-size:14px; height: 200px; background-color:#004a90; padding: 20px; border: 1px solid white;">' +
    '<p style="color: white;">' + 'The page with name: ' + feedbackObject.feedbackPage + ' have recived new feedback. </p>' +
    '<p style="color: white;">Published feedback: "' + feedbackObject.message + '"</p> ' +
    '<a style="color: white;" href="' + feedbackObject.feedbackPageURL + '" >Read more on Filips Sitevision site -> </a>' +
    '</div>' +
    '</div>';
};

let makeFeedbackOutdated = (page) => {
  let feedback = dataStoreProvider.getPrevSearches();
  
}

// hämtar feedback
router.get('/getFeedback', (req, res) => {
  let feedback = dataStoreProvider.getPrevSearches();
  res.status(200).json({ data: feedback });
});

router.post('/addFeedback', (req, res) => {
  logUtil.info("testing: " + JSON.stringify(req));
  let feedback = dataStoreProvider.add(req.params.value);
  if (feedback) {
    const mail = mailBuilder.setSubject("Page " + feedback.feedbackPage + " was published with feedback.")
      .setHtmlMessage(feedbackHTMLMessage(feedback))
      .addRecipient("filip.huhta@consid.se")
      .build();

    mail.send();
  }
  if (feedback) {
    // sendMail("Page " + res.value.feedbackPage + "has new feedback", "Feedback added to page " + res.value.feedbackPage + ": " + res.value.message);
    res.status(200).json({ data: feedback });
  }
});

events.on('sv:publishing:publish', (options) => {
  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);
  // if(options.body.)
  logUtil.info("Testar events: " + JSON.stringify(options));
  logUtil.info(page);
});

router.put('/myroute', (req, res) => {
  res.json({ message: 'Hello from PUT' });
});

router['delete']('/myroute', (req, res) => {
  res.json({ message: 'Hello from DELETE' });
});
