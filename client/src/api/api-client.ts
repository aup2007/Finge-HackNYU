import { LikedStock } from "@/interfaces";
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
    if (categories.length === 0) {
      categories = ["Finance", "Tech", "Consumer", "Energy"];
    }

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

  getCompanyMatches = async (token: string) => {
    const response = await axiosInstance.post<T>(
      this.endpoint,
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
    const response = await axiosInstance.get<T>(`${this.endpoint}/${ticker}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  getLikedStocks = async (token: string) => {
    const response = await axiosInstance.get<T>(this.endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  updateLikedStocks = (stock: LikedStock, token: string) => {
    return axiosInstance
      .post<T>(
        this.endpoint,
        {
          ticker: stock.ticker,
          imageUrl: stock.imageUrl,
          company: stock.company,
          close: stock.close,
          open: stock.open,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
  };

  initializeChat = (ticker: string, token: string) => {
    return axiosInstance
      .post<T>(
        `${this.endpoint}/${ticker}/initialize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
  };

  sendMessage = (ticker: string, message: string, token: string) => {
    return axiosInstance
      .post<T>(
        `${this.endpoint}/${ticker}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
  };
}

export default APIClient;
