import { ContextState } from '@src/components/context/context';
import { Paths } from '@src/constants/paths';

export class ApiUtil {
    public static getContext = async (): Promise<ContextState> => {
        try {
            const res = await fetch(Paths.API_CONTEXT);
            if (!res.ok) {
                throw new Error('NOT OK');
            }
            const state: ContextState = await res.json();
            return state;
        } catch {
            throw new Error('Failed to fetch context');
        }
    };
}
