export default {
  // CCP Dev
  baseUrl: 'http://ec2-34-219-142-13.us-west-2.compute.amazonaws.com/api/v1',
  access_token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFiNjM2MWE2MDkzYjRiNzMwZWYxMTY1YzIxODA1ZmYxYWFjNWZhN2JlMjRlMzliZGQ2Yjk2NTA1OTcxZDZjMDgxNjE3Y2Y2YzBlYjUwMWRhIn0.eyJhdWQiOiIxIiwianRpIjoiMWI2MzYxYTYwOTNiNGI3MzBlZjExNjVjMjE4MDVmZjFhYWM1ZmE3YmUyNGUzOWJkZDZiOTY1MDU5NzFkNmMwODE2MTdjZjZjMGViNTAxZGEiLCJpYXQiOjE1NjgwNTAwMDEsIm5iZiI6MTU2ODA1MDAwMSwiZXhwIjoxNTk5NjcyNDAxLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.I-zsnSQ7kvBgwYos9vcvsjsZoRubdhtyxLlSGXhIfO5FVD0qBf2OuxpTrTFaCzZuSt0xaZjBNbRxKC8YfZou4wY0HTFsquz7nfRTBSnyG1O1oI1RkJq3H9MHNdZSASyxd90SzD-hUN_erkQGV2Zx3QJcwBWbBrVrtuxP-VpeeHh2g3X9PnG5GnR5i7mkhFbPSVI6gYQvgbRvXcEMCGHt2ifKYC3cAr43cHUrNDQphYEesD9AxRgdruikVBQ3ZKFSi1Ax80Kr-iPrgaOIQMc17mQZK18x3jfsNNpFgQMWzcaUvJdF60G-DemLQHmnj3CEjSQt42vtwupHMsABGji_HFC0u26F1yuh2FcX1iVQ59UJ2bajYiWuudJt8PawVv0E2OZlb2AWJHa2Hpmt6ZX_TBYMRbuIWdRAU0UOUC5vbsf6tl4dwjAwig36LllWDNGaGZozK4DCyepOHpml35vBn1C9ju5KBKmZygGcULgPN7ehuxMCos8vRleHGx2qaXAZUiwPT55DLI_XjTqQe1R-qxDxqAWws6at0CnM4hiMj5VEl9ptvhzYpVJbd9ytlMV4rVS3woFdAz4APFopHx-nGtno5bbJCheL0NwkLD9JldR--MuZscx2NRhvdiqAkinryqQo3eaBqblTLT9J8z_U4kwwph-X5r_4dNngy1SlUYQ',
  baseAuthUrl: 'http://ec2-34-219-142-13.us-west-2.compute.amazonaws.com',
  // CCP Prod
  // baseUrl: 'https://www.cuidadoconelperro.com.mx/',
  clientId: '2',
  clientSecret: 'avVHCSJ6PQ9gJ5Uylw2xVTzR4qZbSlDfTxU44UaC',
};

export const LOCATION_ENDPOINTS = {
  LOCATE_ITEM_SCAN: '/locationvariation/locateitemscan',
  SCAN_LOCATION: '/locationvariation/getitemsinlocation',
  GET_LOCATIONS_OF_PRODUCT: '/locationvariation/getlocationsofproduct',
  LOCATE_ITEM_SCAN: '/locationvariation/locateitemscan',
  REMOVE_ITEM_FROM_LOCATION_SCAN: '/locationvariation/removeitemfromlocation',  
  IMAGES_URL: 'https://dsnegsjxz63ti.cloudfront.net/images/pg/g_'
};

export const TOKEN_ENDPOINTS = {
  REQUEST_TOKEN: '/oauth/token',
  REVOKE_TOKEN: '/user/logout',
};

export const USER_ENDPOINTS = {
  USER_PROFILE: '/user/getprofile',
  USER_HISTORY: '/user/getuseractivities',
};