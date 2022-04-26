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
import logUtil from '@sitevision/api/server/LogUtil';
import propertyUtil from '@sitevision/api/server/PropertyUtil';
import dateUtil from '@sitevision/api/server/DateUtil';
import * as requestHelper from './utils/requestHelper';
import i18n from '@sitevision/api/common/i18n';

const currentUser = portletContextUtil.getCurrentUser();
const currentPage = portletContextUtil.getCurrentPage();
const userHasPermission = permissionUtil.hasPermission(currentPage, currentUser, perm);

router.use((req, res, next) => {
  if (systemUserUtil.isAnonymous()) {
    if (req.xhr) {
      return res.status(401).json({ errorMsg: i18n.get('signedOut') });
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
  let feedback = [];
  let options = {
    url: '/getFeedback'
  };

  let storedFeedback = requestHelper.getData(options);
  if (storedFeedback) {
    storedFeedback.forEach(feedbackItem => {
      if (feedbackItem.feedbackPage === propertyUtil.getString(portletContextUtil.getCurrentPage(), "displayName")) {
        feedback.push({
          name: feedbackItem.user,
          message: feedbackItem.message,
          date: dateUtil.getDateAsString("yyyy-MM-dd HH:mm", new Date(feedbackItem.dstimestamp)),
          page: feedbackItem.feedbackPage,
          isOutdated: feedbackItem.isOutdated
        })
      }
    });
  }
  res.agnosticRender(renderToString(<App isInEditor={isInEditor} isAdmin={isAdmin} feedback={feedback} />), {
    isInEditor,
    isAdmin,
    feedback
  });
});

router.post('/addFeedback', (req, res) => {

  let options = {
    url: '/addFeedback',
    value: {
      "message": req.params.feedback,
      "feedbackPage": propertyUtil.getString(portletContextUtil.getCurrentPage(), "displayName"),
      "feedbackPageURL": propertyUtil.getString(portletContextUtil.getCurrentPage(), "URL"),
      "user": propertyUtil.getString(portletContextUtil.getCurrentUser(), "displayName"),
      "isOutdated": false,
    }
  };

  let addedFeedback = requestHelper.addData(options);

  if (addedFeedback) {
    res.json({
      message: i18n.get('feedbackToast')
    });
  }
});

