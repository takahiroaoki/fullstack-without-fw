import './index.scss';
import { Counter } from '@src/components/counter/counter';
import { ContextUtil } from '@src/utils/context_util';

const index = async () => {
    await ContextUtil.initialize();
    new Counter(document.querySelector("[data-ref='counter']")!);
};

document.addEventListener('DOMContentLoaded', index);
