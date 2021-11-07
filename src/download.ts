import axios, { AxiosError } from 'axios';
import { 
  downloadFile,
  DownloadProgressCallbackResult,
  PicturesDirectoryPath,
  scanFile,
  exists,
  mkdir
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
  error: Error | AxiosError | null
]> => {
  try {
    const response = await axios.get<ServerData>(baseUrl, {params: {url}});
    return [response.data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export const download = async (url: string, callback: DownloadCallback): Promise<[
  data: null | ServerData,
  error: Error | AxiosError | null
]> => {
  const [data, error] = await getFileUri(url);
  if (!data) {
    return [null, error]
  }

  if (!(await exists(`${PicturesDirectoryPath}/Download`))) {
    await mkdir(`${PicturesDirectoryPath}/Download`);
  }

  downloadFile({
    fromUrl: `${baseUrl}videos/${data.fileUri}`,
    toFile: `${PicturesDirectoryPath}/Download/${data.fileUri}`,
    progress: callback
  }).promise.then(() => {
    scanFile(`${PicturesDirectoryPath}/Download/${data.fileUri}`);
  })

  return [data, null];
}
