import fetcher from '@/libs/fetcher';

export const uploadService = {
  uploadFile: async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetcher.clientReq<{ url: string }>(`upload`, {
      method: 'POST',
      headers: undefined,
      body: formData,
    });
  },
};
