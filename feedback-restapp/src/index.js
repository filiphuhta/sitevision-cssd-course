import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import properties from '@sitevision/api/server/Properties';
import events from '@sitevision/api/server/events';
import mailBuilder from '@sitevision/api/server/MailBuilder';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import logUtil from '@sitevision/api/server/LogUtil';
import * as dataStoreProvider from './utils/dataStoreProvider';
import { sendMail } from './utils/mailHelper';

router.get('/getFeedback', (req, res) => {
  let feedback = dataStoreProvider.getPrevSearches();
  res.status(200).json({ data: feedback });
});

router.post('/addFeedback', (req, res) => {
  logUtil.info("testing: " + JSON.stringify(req));
  let feedback = dataStoreProvider.add((req.params.value));
  if (feedback) {
  //  sendMail("Page " + res.value.feedbackPage + "has new feedback", "Feedback added to page " + res.value.feedbackPage + ": " + res.value.message);
    res.status(200).json({ data: feedback });
  }
});

events.on("sv:publishing:publish", (options) => {
  /**  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);
 
   logUtil.info(JSON.stringify(options));
 
   */
});

router.put('/myroute', (req, res) => {
  res.json({ message: 'Hello from PUT' });
});

router['delete']('/myroute', (req, res) => {
  res.json({ message: 'Hello from DELETE' });
});
