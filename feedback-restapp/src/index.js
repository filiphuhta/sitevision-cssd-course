import events from '@sitevision/api/server/events';
import * as dataStoreProvider from './utils/dataStoreProvider';

let makeFeedbackOutdated = (page) => {
  let feedback = dataStoreProvider.getPagesById(page);
  feedback.forEach(f => {
      if (!f.isOutdated) {
        f.isOutdated = true;
        dataStoreProvider.update(f.dsid, f);
      }
  })
}

events.on('sv:publishing:publish', (options) => {
  makeFeedbackOutdated(options.node);
});

