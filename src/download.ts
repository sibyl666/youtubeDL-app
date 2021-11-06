import axios, { AxiosError } from 'axios';
import { 
  downloadFile,
  DownloadProgressCallbackResult,
  PicturesDirectoryPath,
  scanFile
} from "react-native-fs";

export interface ServerData {
  fileUri: string,
  thumbnail: {
    url: string
  }
}

type DownloadCallback = (res: DownloadProgressCallbackResult) => void
const baseUrl = 'http://34.75.117.60/';

const getFileUri = async (url: string): Promise<[
  data: null | ServerData,
  error: null | AxiosError | unknown
]> => {
  try {
    const response = await axios.get<ServerData>(baseUrl, {params: {url}});
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
}

export const download = async (url: string, callback: DownloadCallback): Promise<[
  data: null | ServerData,
  error: null | AxiosError | unknown
]> => {
  const [data, error] = await getFileUri(url);
  if (!data) {
    return [null, error]
  }

  downloadFile({
    fromUrl: `${baseUrl}videos/${data.fileUri}`,
    toFile: `${PicturesDirectoryPath}/${data.fileUri}`,
    progress: callback
  }).promise.then(() => {
    scanFile(`${PicturesDirectoryPath}/${data.fileUri}`);
  })

  return [data, null];
}
