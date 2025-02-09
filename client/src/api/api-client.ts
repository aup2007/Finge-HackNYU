import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  // we are going to work on the log in endpoint
  login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const response = await axiosInstance.post<T>(this.endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };
  createUser = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const response = await axiosInstance.post<T>(this.endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  updateCategories = async (categories: string[], token: string) => {
    const response = await axiosInstance.put<T>(
      this.endpoint,
      { categories: categories },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  getCurrentUser = async (token: string) => {
    const response = await axiosInstance.get<T>(
      "/users/current_user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  getCompanyMatches = async (token: string) => {
    const response = await axiosInstance.post<T>(
      "/data/companies/by-preferences",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  getNewsArticles = async (ticker: string, token: string) => {
    const response = await axiosInstance.get<T>(
      `/data/news/${ticker}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  getLikedStocks = async (token: string) => {
    const response = await axiosInstance.get<T>(
      this.endpoint,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  updateLikedStocks = async (ticker: string, imageUrl: string, token: string) => {
    const response = await axiosInstance.post<T>(
      this.endpoint,
      {
        ticker: ticker,
        imageUrl: imageUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
}

export default APIClient;
