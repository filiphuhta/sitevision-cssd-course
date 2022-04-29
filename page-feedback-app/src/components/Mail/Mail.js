import * as React from 'react';
import PropTypes from 'prop-types';
import i18n from '@sitevision/api/common/i18n';

const Mail = ({ feedback }) => {
   const mailStyling = {
      container: {
         backgroundColor: "#80c5ff",
         height: "100 %",
         margin: "10px",
         borderRadius: "5px",
         padding: "20px",
      },
      heading: {
         textAlign: "center",
         fontSize: "30px",
         color: "white"
      },
      body: {
         textAlign: "center",
         fontSize: "14px",
         height: "200px",
         backgroundColor: "#004a90",
         padding: "20px",
         border: "1px solid white"
      },
      whiteText: {
         color: "white",
      }
   };
   
   return (
      <div style={mailStyling.container}>
         <h2 style={mailStyling.heading}>{i18n.get('emailMessageFrom')} </h2>
         <div style={mailStyling.body}>
            <p style={mailStyling.whiteText}>{i18n.get('emailHeading', feedback.feedbackPage)}</p>
            <p style={mailStyling.whiteText}>{i18n.get('emailMessage', feedback.message)} </p>
            <a style={mailStyling.whiteText} href={feedback.feedbackPageURL} > {i18n.get('emailLink')}
            </a>
         </div>
      </div >
   );
};

Mail.propTypes = {
   feedback: PropTypes.object
};

export default Mail;
