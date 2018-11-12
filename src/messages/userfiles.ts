const DOMAIN = 'userfiles';
const PICKFILE_EVENT = 'pickfile';
const UPLOAD_EVENT = 'upload';

export const pickFile = (...mimeTypes: string[]) => ({
  domain: DOMAIN,
  eventType: PICKFILE_EVENT,
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
  eventType: UPLOAD_EVENT,
  data: {
    local_path: localPath,
    upload_url: uploadUrl,
    upload_method: options && options.uploadMethod ? options.uploadMethod : 'POST',
    upload_headers: options && options.headers ? options.headers : undefined
  },
});
