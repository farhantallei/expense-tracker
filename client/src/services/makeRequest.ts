import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}

const api = axios.create({
  baseURL: 'http://localhost:1000/api',
  withCredentials: true,
});

async function makeRequest<Response = any, Params = any>(
  url: string,
  options?: AxiosRequestConfig<Params>
) {
  try {
    const res: AxiosResponse<Response, Params> = await api(url, options);
    return res.data;
  } catch (err) {
    if (!axios.isAxiosError(err) || !err.response?.data)
      return Promise.reject(new Error('Internal service error'));
    return Promise.reject(
      new Error((err.response.data as FastifyError).message)
    );
  }
}

export default makeRequest;
