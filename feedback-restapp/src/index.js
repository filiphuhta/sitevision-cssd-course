import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import properties from '@sitevision/api/server/Properties';
import events from '@sitevision/api/server/events';
import mailBuilder from '@sitevision/api/server/MailBuilder';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import logUtil from '@sitevision/api/server/LogUtil';
import * as dataStoreProvider from './utils/dataStoreProvider';

router.get('/getFeedback', (req, res) => {
  let feedback = dataStoreProvider.getPrevSearches();
  res.status(200).json({ data: feedback });
});

router.post('/addFeedback', (req, res) => {
  logUtil.info(JSON.stringify(res));
  let feedback = dataStoreProvider.add(res.value);
  res.status(200).json({ data: feedback });
});

events.on("sv:publishing:publish", (options) => {
  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);

  logUtil.info(JSON.stringify(options));
  const mail = mailBuilder.setSubject(page + "was published")
    .setTextMessage(options.emitter + "published" + page)
    .addRecipient("filip.huhta@consid.se")
    .build();

  mail.send();
});

router.put('/myroute', (req, res) => {
  res.json({ message: 'Hello from PUT' });
});

router['delete']('/myroute', (req, res) => {
  res.json({ message: 'Hello from DELETE' });
});
