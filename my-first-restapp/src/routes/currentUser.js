import router from '@sitevision/api/common/router';
import portletContextUtil from '@sitevision/api/server/PortletContextUtil';
import properties from '@sitevision/api/server/Properties';

router.get("/currentUser", (req, res) => {
    const currentUser = portletContextUtil.getCurrentUser();
    const mail = properties.get(currentUser, "mail");

    res.json({
        mail
    });

});