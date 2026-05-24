import api from '@/lib/apiClient';

export const login = async (nickname: string, password: string): Promise<string> => {
  const response = await api.post('/login', {
    nickname,
    password,
  });

  return response.data;
};

export const register = async (data: {
  nickname: string;
  email: string;
  password: string;
}): Promise<string> => {
  const response = await api.post('/register', {
    data,
  });

  return response.data;
};

export const refresh = async (refreshToken: string): Promise<string> => {
  const response = await api.post('/register', {
    refreshToken,
  });

  return response.data;
};

// export const logout = async (data: {nickname:string, email:string, password: string}):Promise<string> => {
//   const response = await api.post('/register', {
//     data
//   })

//   return response.data

// }
