import * as React from 'react';
import { renderToString } from 'react-dom/server';
import router from '@sitevision/api/common/router';
import appData from '@sitevision/api/server/appData';
import App from './components/App';
import versionUtil from '@sitevision/api/server/VersionUtil';
import systemUserUtil from '@sitevision/api/server/SystemUserUtil';
import portletContextUtil from '@sitevision/api/server/PortletContextUtil';
import roleUtil from '@sitevision/api/server/RoleUtil';
import permissionUtil from '@sitevision/api/server/PermissionUtil';
import perm from '@sitevision/api/server/PermissionUtil.Permission.DEVELOPER';
import storage from '@sitevision/api/server/storage';
import logUtil from '@sitevision/api/server/LogUtil';
import propertyUtil from '@sitevision/api/server/PropertyUtil';
const dataStore = storage.getCollectionDataStore("feedbackStore");

const currentUser = portletContextUtil.getCurrentUser();
const currentPage = portletContextUtil.getCurrentPage();
const userHasPermission = permissionUtil.hasPermission(currentPage, currentUser, perm);

router.use((req, res, next) => {
  if (systemUserUtil.isAnonymous()) {
    if (req.xhr) {
      return res.status(401).json({ errorMsg: "Du har blivit utloggad" });
    }
  } else {
    roleUtil.getRoleByName("sv:role");
    next();
    req.data = { currentUser: portletContextUtil.getCurrentUser() };
  }
});


router.get('/', (req, res) => {
  let isInEditor = versionUtil.getCurrentVersion() != versionUtil.ONLINE_VERSION ? true : false;
  let isAdmin = userHasPermission ? true : false;

  res.agnosticRender(renderToString(<App isInEditor={isInEditor} isAdmin={isAdmin} />), {
    isInEditor,
    isAdmin
  });
});

router.post('/addFeedback', (req, res) => {
  logUtil.info(JSON.stringify(req));
  let feedback = {
    "message": req.params.feedback,
    "user": propertyUtil.getString(portletContextUtil.getCurrentUser(), "displayName")
  };

  try {
    const result2 = dataStore.add(feedback);
    logUtil.info(JSON.stringify(result2));

  } catch (e) {
    logUtil.info(e.message);
  }

  res.json({
    message: "Du har nu lämnat feedback, tack för din slösade tid. :)"
  });
  
});
