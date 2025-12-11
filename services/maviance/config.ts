const URL = 'https://s3p.smobilpay.staging.maviance.info/v2';
const PING_URL = `${URL}/ping`;
const QUOTE_URL = `${URL}/quotestd`;
const COLLECT_URL = `${URL}/collectstd`;
const VERIFY_URL = `${URL}/verifytx`;
const MTN_PAYITEM_ID = 'S-112-949-MTNMOMO-20053-200050001-1';
const ORANGE_PAYITEM_ID = 'S-112-949-CMORANGEOM-30053-2006125105-1';
const MTN_REGEX =
    '^(237|00237|\\+237)?((650|651|652|653|654|680|681|682|683)\\d{6}$|(67\\d{7}$|(4\\d{10})))$';
const ORANGE_REGEX =
    '^(237)?((655|656|657|658|659|686|687|688|689|640)[0-9]{6}$|(69[0-9]{7})$)';
const S3P_SECRET = '599b94e1-b4bc-4e99-890b-2a346cb8a017';
const S3P_SIGNATURE_METHOD = 'HMAC-SHA1';
const S3P_KEY = 'edd2d988-2eed-46cb-a29f-af813cf49087';

export {
    COLLECT_URL, MTN_PAYITEM_ID,
    MTN_REGEX,
    ORANGE_PAYITEM_ID,
    ORANGE_REGEX, PING_URL,
    QUOTE_URL, S3P_KEY, S3P_SECRET, S3P_SIGNATURE_METHOD, VERIFY_URL
};

