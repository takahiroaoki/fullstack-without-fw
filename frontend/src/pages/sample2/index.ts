import { ContextUtil } from '@src/utils/context_util';
import './index.scss';
import { CounterList } from '@src/components/counter_list/counter_list';

const index = async () => {
    await ContextUtil.initialize();
    new CounterList(document.querySelector('[data-ref="counter-list"]')!);
};

document.addEventListener('DOMContentLoaded', index);
