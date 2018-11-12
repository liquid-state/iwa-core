import { pickFile, upload } from "./userfiles";

describe('Userfiles domain', () => {
  describe('pickFile', () => {
    it('Should have the correct domain and eventType', () => {
      expect(pickFile()).toMatchObject({ domain: 'userfiles', eventType: 'pickfile' });
    });

    it('Should accept a mime types', () => {
      expect(pickFile('image/png').data.mime_types).toMatchObject(['image/png']);
    });
  });

  describe('upload', () => {
    it('Should have the correct domain and event type', () => {
      expect(upload('example', 'url')).toMatchObject({ domain: 'userfiles', eventType: 'upload' });
    });

    it('Should set the local path and upload url correctly', () => {
      const data = upload('file://', 'https://').data;
      expect(data).toMatchObject({ local_path: 'file://', upload_url: 'https://' });
    });

    it('Should have POST as a default upload method', () => {
      const data = upload('any', 'any').data;
      expect(data.upload_method).toBe('POST');
    });

    it('Should accept uploadMethod as an option', () => {
      const data = upload('any', 'any', { uploadMethod: 'PUT' }).data;
      expect(data.upload_method).toBe('PUT');
    });

    it('Should accept headers as an option', () => {
      const data = upload('any', 'any', { headers: { Authorization: 'test' } }).data;
      expect(data.upload_headers).toMatchObject({ Authorization: 'test' });
    });
  });
});
