import logUtil from '@sitevision/api/server/LogUtil';
import restAppInvokerFactory from '@sitevision/api/server/RestAppInvokerFactory';
const restApp = restAppInvokerFactory.fromPath('/rest-api/feedback-restapp');

export const getData = (options) => {
   let data;
   let result = restApp.get(options.url);
   if (result.statusCode === 200) {
      data = result.body.data;
   } else {
      logUtil.error("Could not get data.");
   }
   return data;
};

export const addData = (options) => {
   let data;
   let result = restApp.post(options.url, { value: options });
   if (result.statusCode === 200) {
      data = result.body.data;
   } else {
      logUtil.error("Could not post data.");
   }
   return data;
};