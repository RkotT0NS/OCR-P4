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

export type PaginatedUploads = {
  data: UploadDetail[];
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from?: number;
    last_page: number;
    links?: { url: string | null; label: string; active: boolean }[];
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
  };
};
