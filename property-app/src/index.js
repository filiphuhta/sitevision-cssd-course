import * as React from 'react';
import { renderToString } from 'react-dom/server';
import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import App from './components/App';
import i18n from '@sitevision/api/common/i18n';
import systemUserUtil from '@sitevision/api/server/SystemUserUtil';
import portletContextUtil from '@sitevision/api/server/PortletContextUtil';
import propertis from '@sitevision/api/server/Properties';
import { add, getPrevSearches } from './utils/dataStoreProvider';

router.use((req, res, next) => {
  if (systemUserUtil.isAnonymous()) {

    if (req.xhr) {
      return res.status(401).json({ errorMsg: "Du har blivit utloggad" });
    }
  }

  req.data = { currentUser: portletContextUtil.getCurrentUser() };

  next();
});

router.get('/', (req, res) => {
  const pageName = appData.get("page", "displayName");
  const name = propertis.get(req.data.currentUser, "displayName");
  const prevSearches = getPrevSearches();

  res.agnosticRender(renderToString(<App pageName={pageName} name={name} prevSearches={prevSearches} />), {
    pageName,
    name,
    prevSearches
  }
  );
});


router.get('/getProperty', (req, res) => {
  const propertyValue = appData.get("page", req.params.property);

  if (!propertyValue) {
    return res.status(400).json({ errorMsg: i18n.get("propertyNoExist", req.params.property) });
  }

  add({
    input: req.params.property,
    value: propertyValue,
    user: req.data.currentUser.getIdentifier(),
  });

  const prevSearches = getPrevSearches();

  res.json({
    propertyValue,
    prevSearches
  });
});