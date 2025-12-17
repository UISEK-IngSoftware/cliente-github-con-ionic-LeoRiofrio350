import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });

    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description ? repo.description : null,
      imageUrl: repo.owner ? repo.owner.avatar_url : null,
      owner: repo.owner ? repo.owner.login : null,
      language: repo.language ? repo.language : null,
    }));

    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const createdRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}user/repos`,repo,{
         headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });
        console.log("Repositorio creado:", response.data);
      } catch (error) {
    console.error("Error al crear repositorio:", error);
  }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}user`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        return response.data as UserInfo;
    }catch (error) {
        console.error("Error fetching user info:", error);
        const userNotFound: UserInfo = {
            login: "undefined",
            name: "no se pudo obtener el nombre",
            bio: "Nose pudo obtener la información del usuario",
            avatar_url:'https://www.shutterstock.com/image-vector/block-user-icon-account-disabled-260nw-2619225659.jpg'
        }
        return userNotFound;

    }

};