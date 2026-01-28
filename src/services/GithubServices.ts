import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/UserInfo';
import AuthService from './AuthServices';

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
    
    

});



githubApi.interceptors.request.use(
    (config) => {
        const authHeader = AuthService.getAuthHeaders();
        if (authHeader) {
            config.headers['Authorization'] = authHeader;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get('/user/repos', {
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
                affiliation: 'owner',
            },
        });

        return response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ?? null,
            imageUrl: repo.owner?.avatar_url ?? null,
            owner: repo.owner?.login ?? null,
            language: repo.language ?? null,
        }));
    } catch (error) {
        console.error('Error al obtener repositorios:', error);
        throw error;
    }
};


export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const response = await githubApi.get('/user');
        return response.data as UserInfo;
    } catch (error) {
        console.error('Error al obtener información del usuario:', error);
        return {
            login: 'undefined',
            name: 'Usuario no encontrado',
            bio: 'No se puede obtener la información del usuario',
            avatar_url:
                'https://static.vecteezy.com/system/resources/previews/026/551/249/non_2x/profile-page-pixelated-ui-icon-address-book-management-contact-user-name-phone-number-editable-8bit-graphic-element-outline-isolated-user-interface-image-for-web-mobile-app-retro-style-vector.jpg',
        };
    }
};



export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const payload = {
            name: repo.name,
            description: repo.description || '',
            private: false,
            auto_init: true,
        };

        await githubApi.post('/user/repos', payload);
    } catch (error: any) {
        console.error('Error al crear repositorio:', error);
        throw new Error(
            error.response?.data?.message || 'Error al crear el repositorio'
        );
    }
};


export const updateRepository = async (
    owner: string,
    repoName: string,
    updatedData: Partial<RepositoryItem>
): Promise<RepositoryItem> => {
    try {
        const payload: Record<string, unknown> = {};

        if (updatedData.name) {
            payload.name = updatedData.name;
        }

        if (updatedData.description !== undefined) {
            payload.description = updatedData.description;
        }

        const response = await githubApi.patch(
            `/repos/${owner}/${repoName}`,
            payload
        );

        return {
            name: response.data.name,
            description: response.data.description,
            imageUrl: response.data.owner.avatar_url,
            owner: response.data.owner.login,
            language: response.data.language,
        };
    } catch (error: any) {
        console.error('Error al actualizar repositorio:', error);
        throw new Error(
            error.response?.data?.message || 'Error al actualizar repositorio'
        );
    }
};


export const deleteRepository = async (
    owner: string,
    repoName: string
): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
    } catch (error: any) {
        console.error('Error al eliminar repositorio:', error);
        throw new Error(
            error.response?.data?.message || 'Error al eliminar repositorio'
        );
    }
};
