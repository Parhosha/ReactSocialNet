import { userType } from './../redux/Chat-reducer';
import axios from 'axios';
import { photosType } from '../redux/Chat-reducer';

type UserType = {
  id: number;
  name: string;
  status: string;
  photos: photosType;
  followed: boolean;
};
type getUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string;
};

type logAndEditType = {
  resultCode: number;
  messages: Array<string>;
  data: object;
};
type getCaptchaType = {
  url: string;
};

type meType = {
  resultCode: number;
  messages: Array<string>;
  data: { id: number; email: string; login: string };
};

type ResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    userId: number;
  };
};
const API = {
  getUsers(pageSize = 5 as number, pageNumber: number) {
    return axios
      .get<getUsersType>(
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
  unFollow(userId: number) {
    return axios
      .delete('https://social-network.samuraijs.com/api/1.0/follow/' + userId, {
        withCredentials: true,
        headers: {
          'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
        },
      })
      .then((res) => res.data);
  },
  setFollow(userId: number) {
    return axios
      .post<ResponseType>(
        'https://social-network.samuraijs.com/api/1.0/follow/' + userId,
        {},
        {
          withCredentials: true,
          headers: {
            'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
          },
        },
      )
      .then((res) => res);
  },

  logIn(
    email: string,
    password: string,
    rememberMe = true as boolean,
    captcha: null | string = null,
  ) {
    return axios
      .post<logAndEditType>(
        'https://social-network.samuraijs.com/api/1.0/auth/login',
        {
          email,
          password,
          rememberMe,
          captcha,
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
  getCaptcha() {
    return axios
      .get<getCaptchaType>(
        'https://social-network.samuraijs.com/api/1.0/security/get-captcha-url',
        {
          withCredentials: true,
          headers: {
            'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
          },
        },
      )
      .then((res) => {
        return res.data;
      });
  },
  logOut() {
    return axios
      .delete<logAndEditType>('https://social-network.samuraijs.com/api/1.0/auth/login')
      .then((res) => console.log(res));
    // не работает логаут на сервере хотя резалт код 0
  },
  Me() {
    return axios
      .get<meType>('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  },
  getStatus(userId: number) {
    return axios.get('https://social-network.samuraijs.com/api/1.0/profile/status/' + userId);
  },
  editProfile(profileEdit: userType) {
    console.log(profileEdit);
    return axios.put<logAndEditType>(
      'https://social-network.samuraijs.com/api/1.0/profile',
      profileEdit,
      {
        withCredentials: true,
        headers: {
          'API-KEY': '56d58e33-3be0-401e-afaa-d0a047a84c57',
        },
      },
    );
  },
  updStatus(text: string) {
    alert(text);
    return axios.put<logAndEditType>(
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

  getStatusUserId(userId: number) {
    return axios.get(
      'https://social-network.samuraijs.com/api/1.0/profile/status?userid=' + userId,
    );
  },

  uploadPhoto(photo: any) {
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
};
export default API;
