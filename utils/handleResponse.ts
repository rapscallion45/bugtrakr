const handleResponse = (response: any) => response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        /* immediate logout if 401 (unauthorized) response returned from api */
        // localStorage.removeItem('user');
        // window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    /* check if there's a response message from server */
    if (data.message) {
      return data && data.message;
    }
    return data;
  });
export default handleResponse;
