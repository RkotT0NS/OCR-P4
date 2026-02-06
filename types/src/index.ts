// Shared types for DataShare

export interface UploadDetail {
  uuid: string;
  original_name: string;
  mime_type: string;
  size: number;
  expires_at: string;
  deleted_at: string | null;
  created_at: string;
  url: string;
  locked: boolean;
}

export interface Upload {
  uuid: string;
  original_name: string;
  has_password: boolean;
  mime_type: string;
  size: number;
  expires_at: string;
  deleted_at: string | null;
  download_url: string | null;
}
