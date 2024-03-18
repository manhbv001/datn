export interface IResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  metadata?: Record<string, any>;
}

export class Response<T> implements IResponse<T> {
  success: boolean;
  data: T;
  metadata?: Record<string, any>;
  message?: string;

  constructor(payload: Partial<IResponse<T>>) {
    this.data = payload.data;
    this.success = payload.success;
    this.metadata = payload.metadata;
    this.message = payload.message;
  }
}

export class SuccessResponse<T> extends Response<T> {
  constructor(data: T, metadata?: Record<string, any>) {
    super({ success: true, data, metadata });
  }
}

export class FailResponse extends Response<null> {
  constructor(message?: string) {
    super({ success: false, data: null, metadata: null, message });
  }
}
