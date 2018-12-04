export const DOMAIN = 'userfiles';
export const PICKFILE = 'pickfile';
export const UPLOAD = 'upload';
export const CACHE_LOCAL = 'cachelocal';
export const CACHE_GET = 'cacheget';

export const pickFile = (...mimeTypes: string[]) => ({
  domain: DOMAIN,
  eventType: PICKFILE,
  data: {
    mime_types: mimeTypes,
  }
});

type UploadOptions = {
  uploadMethod?: "POST" | "PUT",
  headers?: object
};

export const upload = (localPath: string, uploadUrl: string, options?: UploadOptions) => ({
  domain: DOMAIN,
  eventType: UPLOAD,
  data: {
    local_path: localPath,
    upload_url: uploadUrl,
    upload_method: options && options.uploadMethod ? options.uploadMethod : 'POST',
    upload_headers: options && options.headers ? options.headers : undefined
  },
});

export type CacheID = string;
export type LocalPath = string;

export type CacheLocalFile = {
  name: CacheID,
  path: LocalPath
};

export const cacheLocal = (...files: CacheLocalFile[]) => ({
  domain: DOMAIN,
  eventType: CACHE_LOCAL,
  data: {
    files
  },
});

export const cacheGet = (name: CacheID, downloadUrl?: string, downloadHeaders?: object) => ({
  domain: DOMAIN,
  eventType: CACHE_GET,
  data: {
    name,
    download_url: downloadUrl,
    download_headers: downloadHeaders,
  }
});
