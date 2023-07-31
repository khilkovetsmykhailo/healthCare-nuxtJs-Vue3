/* eslint-disable no-console */
export default (error) => {
  if (error.response) {
    // server responded with status code outside 2xx
    console.error('Response Code: ', error.response.status);
    console.error('Response Header: ', error.response.header || 'No header');
  } else if (error.request) {
    // request was made but no response was received
    console.error('Request: ', error.request);
  } else {
    // failure occured before request was called
    console.error('Error: ', error.message);
  }
  console.error('Config: ', error.config);
  return { error: error.message };
};
