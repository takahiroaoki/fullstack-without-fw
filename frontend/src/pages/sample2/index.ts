import './index.scss';
import { CounterList } from '@src/components/counter_list/counter_list';

const index = () => {
    new CounterList(document.querySelector('[data-ref="counter-list"]')!);
};

document.addEventListener('DOMContentLoaded', index);
