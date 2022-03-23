import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import properties from '@sitevision/api/server/Properties';
import events from '@sitevision/api/server/events';
import mailBuilder from '@sitevision/api/server/MailBuilder';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import logUtil from '@sitevision/api/server/LogUtil';
import storage from '@sitevision/api/server/storage';
const dataStore = storage.getCollectionDataStore("messages");


router.post("/feedback", (req, res) => {
  const { messages } = req.params;
  try {
    const post = dataStore.add({ messages });
    res.json({ post });
  }
  catch (e) {
    console.log("Failded to add message to messages-datastore. cause:" + JSON.stringify(e))
  }

  res.status(200);

});

router.get('/messages', (req, res) => {
  // default 10 utan en extra parameter
  const searchResult = dataStore.find("*");

  res.json(searchResult.toArray());
});

events.on("sv:publishing:publish", (options) => {
  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);

  const mail = mailBuilder.setSubject(page + "was published")
    .setTextMessage(options.emitter + "published" + page)
    .addRecipient("filip.huhta@consid.se")
    .build();

  mail.send();
});

events.on("sv:traschcan:add", (options) => {
  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);
  logUtil.info(page + "Was added to the traschcan by" + options.emitter);
});

router.get('/currentPageProperty', (req, res) => {
  const { value } = req.params;
  const selectedPage = appData.get("page");
  const props = properties.get(selectedPage, value);

  res.json({
    pageName: props,
  })

});

import "./routes/currentUser";