import events from '@sitevision/api/server/events';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import * as dataStoreProvider from './utils/dataStoreProvider';

let makeFeedbackOutdated = (page) => {
  let feedback = dataStoreProvider.getPrevSearches();
  feedback.forEach(f => {
    if (f.feedbackPageId === page) {
      if (!f.isOutdated) {
        f.isOutdated = true;
        dataStoreProvider.update(f.dsid, f);
      }
    }
  })
}

events.on('sv:publishing:publish', (options) => {
  const page = resourceLocatorUtil.getNodeByIdentifier(options.node);
  makeFeedbackOutdated(page.getIdentifier());
});

