import { LikedStock } from "@/Interfaces";
import axios from "axios";

// Use environment variable with fallback for development
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
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

  getStockDetails = async (ticker: string, token: string) => {
    const response = await axiosInstance.get<T>(`${this.endpoint}/${ticker}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
}

export default APIClient;
