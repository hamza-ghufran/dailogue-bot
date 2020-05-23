const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const DOB_REGEX = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
const PROJECT_ID = 'newagent-htycvu'; 
const SESSION_ID = '123456';
const LANG_CODE = 'en-US';


module.exports = {
    EMAIL_REGEX: EMAIL_REGEX,
    DOB_REGEX: DOB_REGEX,
    PROJECT_ID: PROJECT_ID,
    SESSION_ID: SESSION_ID,
    LANG_CODE: LANG_CODE,
}
