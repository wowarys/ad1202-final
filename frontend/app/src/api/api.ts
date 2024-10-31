import axios from "axios";
import { toast } from "../hooks/use-toast";
import { calculateAge } from "../lib/utils";

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get("/api/v1/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { name } = response.data;
    localStorage.setItem("userName", name);
    console.log(name);
  } catch (error) {
    console.error("Ошибка при получении профиля пользователя", error);
  }
};

export const loginUser = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/api/v1/user/login", {
      username: userData.username,
      password: userData.password,
    });

    const { access_token } = response.data;
    localStorage.setItem("accessToken", access_token);

    await fetchUserProfile(access_token);

    console.log(access_token);

    toast({
      title: "Авторизация успешно",
      description: "Вы успешно вошли",
    });

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response.data.detail ||
          error.response.data.message ||
          "Ошибка при регистрации";

        toast({
          title: "Ошибка регистрации",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Ошибка сети",
          description:
            "Не удалось подключиться к серверу. Пожалуйста, проверьте подключение.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Произошла непредвиденная ошибка",
          variant: "destructive",
        });
      }
    }

    throw error;
  }
};

export const registerUser = async (userData: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await axios.post("/api/v1/user/register", {
      username: userData.username,
      password: userData.password,
      email: userData.email,
    });

    toast({
      title: "Регистрация успешна",
      description: "Вы успешно зарегистрированы",
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response.data.detail ||
          error.response.data.message ||
          "Ошибка при регистрации";

        toast({
          title: "Ошибка регистрации",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Ошибка сети",
          description:
            "Не удалось подключиться к серверу. Пожалуйста, проверьте подключение.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Произошла непредвиденная ошибка",
          variant: "destructive",
        });
      }
    }

    throw error;
  }
};

export const createProfile = async (profileData: {
  first_name: string;
  last_name: string;
  birth_date: Date;
  bio: string;
}) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Access token not found");
    }

    const astanaDate = new Date(profileData.birth_date);
    astanaDate.setHours(astanaDate.getHours() + 5);

    const age = calculateAge(astanaDate);

    const response = await axios.post(
      "/api/v1/user/profile/create",
      {
        ...profileData,
        birth_date: astanaDate,
        name: `${profileData.first_name} ${profileData.last_name}`,
        age: age,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast({
      title: "Профиль создан",
      description: "Ваш профиль успешно создан",
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage =
          error.response.data.detail ||
          error.response.data.message ||
          "Ошибка при создании профиля";

        toast({
          title: "Ошибка создания профиля",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (error.request) {
        toast({
          title: "Ошибка сети",
          description:
            "Не удалось подключиться к серверу. Пожалуйста, проверьте подключение.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Произошла непредвиденная ошибка",
          variant: "destructive",
        });
      }
    }

    throw error;
  }
};
