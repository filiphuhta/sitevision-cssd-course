import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import router from '@sitevision/api/common/router';
import App from './components/App';
import versionUtil from '@sitevision/api/server/VersionUtil';
import systemUserUtil from '@sitevision/api/server/SystemUserUtil';
import portletContextUtil from '@sitevision/api/server/PortletContextUtil';
import roleUtil from '@sitevision/api/server/RoleUtil';
import permissionUtil from '@sitevision/api/server/PermissionUtil';
import perm from '@sitevision/api/server/PermissionUtil.Permission.DEVELOPER';
import propertyUtil from '@sitevision/api/server/PropertyUtil';
import dateUtil from '@sitevision/api/server/DateUtil';
import i18n from '@sitevision/api/common/i18n';
import appData from '@sitevision/api/server/appData';
import mailBuilder from '@sitevision/api/server/MailBuilder';
import Mail from './components/Mail/Mail';

import {
  addData,
  getPagesById
} from './utils/dataStoreProvider';

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

  let storedFeedback = getPagesById(portletContextUtil.getCurrentPage().getIdentifier());
  if (storedFeedback) {
    storedFeedback.forEach(feedbackItem => {
      feedback.push({
        name: feedbackItem.user,
        message: feedbackItem.message,
        date: dateUtil.getDateAsString("yyyy-MM-dd HH:mm", new Date(feedbackItem.dstimestamp)),
        page: feedbackItem.feedbackPage,
        isOutdated: feedbackItem.isOutdated
      })

    });
  }
  res.agnosticRender(renderToString(<App isInEditor={isInEditor} isAdmin={isAdmin} feedback={feedback} />), {
    isInEditor,
    isAdmin,
    feedback
  });
});

router.post('/addFeedback', (req, res) => {

  let feedback = {
    "message": req.params.feedback,
    "feedbackPageId": portletContextUtil.getCurrentPage().getIdentifier(),
    "feedbackPage": propertyUtil.getString(portletContextUtil.getCurrentPage(), "displayName"),
    "feedbackPageURL": propertyUtil.getString(portletContextUtil.getCurrentPage(), "URL"),
    "user": propertyUtil.getString(portletContextUtil.getCurrentUser(), "displayName"),
    "isOutdated": false,
  };

  let addedFeedback = addData(feedback);

  if (addedFeedback) {
    sendMail(addedFeedback);
    res.json({
      message: i18n.get('feedbackToast')
    });
  }
});

let sendMail = (feedback) => {
  if (feedback) {
    const mail = mailBuilder.setSubject(i18n.get('emailSubject', feedback.feedbackPage))
      .setHtmlMessage(renderToStaticMarkup(<Mail feedback={feedback} />))
      .addRecipient(appData.get('email'))
      .build();
    mail.send();
  }
}


