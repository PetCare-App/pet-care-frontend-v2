import { api } from './api';

export const postChatService = async (data: any) => {
    return await api.post('/openai', { prompt: data });
};
