import { toast, ToastOptions } from 'react-hot-toast';

export type ToastOptionsWithTypes = ToastOptions & {
    type: 'success' | 'error' 
}
export const notify = (msg: string, options?: ToastOptionsWithTypes) => options?.type ? toast[options.type](msg, options) : toast(msg, options);