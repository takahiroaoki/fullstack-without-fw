import { ApiUtil } from './api_util';
import { Context, ContextState } from '@src/components/context/context';

export class ContextUtil {
    public static async initialize(): Promise<void> {
        const state: ContextState = await ApiUtil.getContext();
        Context.initialize(state);
    }
}
