import axiosClient from '../axios/axiosLogIn';

export const postLogIn = async (userState) => {
    console.log(userState);
    return axiosClient
      .post('', {
        ...userState
      })
      .then(async(res) => {
        return res.status
      })
      .catch((e) => {
        console.log(`register error`, e.response);
        throw "error"
      });
};