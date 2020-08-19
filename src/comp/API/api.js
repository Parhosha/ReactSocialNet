import axios from 'axios';

const API = {
  getUsers(pageSize = 5, pageNumber) {
    return axios
      .get(
        'https://social-network.samuraijs.com/api/1.0/users?count=' +
          pageSize +
          '&page=' +
          pageNumber,
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        return response.data;
      });
  },

  logIn(email, password, rememberMe = true) {
    return axios
      .post(
        'https://social-network.samuraijs.com/api/1.0/auth/login',
        {
          email,
          password,
          rememberMe,
        },
        {
          withCredentials: true,
          headers: {
            'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
          },
        },
      )
      .then((resp) => {
        return resp.data;
      });
  },
  logOut() {
    return axios
      .delete('https://social-network.samuraijs.com/api/1.0/auth/login')
      .then((res) => console.log(res));
  },
  Me() {
    return axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  },
  getStatus(userId) {
    return axios.get('https://social-network.samuraijs.com/api/1.0/profile/status/' + userId);
  },
  updStatus(text) {
    alert(text);
    return axios.put(
      'https://social-network.samuraijs.com/api/1.0/profile/status',
      {
        status: text,
      },
      {
        withCredentials: true,
        headers: {
          'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
        },
      },
    );
  },

  getStatusUserId(userId) {
    return axios.get(
      'https://social-network.samuraijs.com/api/1.0/profile/status?userid=' + userId,
    );
  },

  setFollow(userId) {
    return axios.post(
      'https://social-network.samuraijs.com/api/1.0/follow/' + userId,
      {},
      {
        withCredentials: true,
        headers: {
          'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
        },
      },
    );
  },

  uploadPhoto(photo) {
    const formData = new FormData();
    formData.append('image', photo);
    return axios.put('https://social-network.samuraijs.com/api/1.0/profile/photo', formData, {
      withCredentials: true,
      headers: {
        'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
        'Content-type': 'multipart/form-data',
      },
    });
  },

  unFollow(userId) {
    return axios.delete('https://social-network.samuraijs.com/api/1.0/follow/' + userId, {
      withCredentials: true,
      headers: {
        'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
      },
    });
  },
};
export default API;
