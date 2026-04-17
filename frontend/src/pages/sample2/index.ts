import './index.scss';
import { CounterList } from '@src/components/counter_list/counter_list';

const index = () => {
    new CounterList(document.querySelector('[data-ref="counter-list"]')!, { total: 0 });
};

document.addEventListener('DOMContentLoaded', index);
