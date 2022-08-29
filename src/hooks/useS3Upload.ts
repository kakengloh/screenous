import axios from 'axios';
import { UploadClipResponse } from 'pages/api/clips/upload';
import { useMutation } from 'react-query';

export const useS3Upload = () =>
  useMutation(
    async (blob: Blob) => {
      const {
        data: { url, fields, id },
      } = await axios.get<UploadClipResponse>('/api/clips/upload');

      await axios.postForm(url, {
        ...fields,
        file: new File([blob], `${id}.webm`),
      });

      const downloadUrl = URL.createObjectURL(blob);

      return {
        id,
        downloadUrl,
      };
    },
    {
      mutationKey: 'S3_UPLOAD',
    },
  );
