import { StateManager } from '../../cores/state_manager';

export type ContextState = {
    theme: 'light' | 'dark';
};

let context: Context;

export class Context extends StateManager<ContextState> {
    public static initialize(state: ContextState): Context {
        if (!context) {
            context = new Context(state);
        } else {
            context.setState(state);
        }
        return context;
    }
    public static getInstance(): Context {
        if (!context) {
            throw new Error('Context is not initialized.');
        }
        return context;
    }
}
