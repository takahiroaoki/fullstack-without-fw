import './index.scss';
import { Counter } from '@src/components/counter/counter';

const index = () => {
    new Counter(document.querySelector("[data-ref='counter']")!, { count: 0 });
};

document.addEventListener('DOMContentLoaded', index);
