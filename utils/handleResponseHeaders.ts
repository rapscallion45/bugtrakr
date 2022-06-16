/* eslint-disable */
const handleResponseHeaders = (response: any) => {
  let data = {};
  /* number of posts and post pages set in response header */
  for (const pair of response.headers.entries()) {
    if (pair[0] === 'x-wp-total') {
      /* add value of header pair */
      data = { ...data, totalPosts: pair[1] };
    }
    if (pair[0] === 'x-wp-totalpages') {
      /* add value of header pair */
      data = { ...data, totalPostsPages: pair[1] };
    }
  }
  return data;
};
export default handleResponseHeaders;
