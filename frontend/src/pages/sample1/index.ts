import './index.scss';
import { Counter } from '@src/components/counter/counter';

const index = () => {
    new Counter(document.querySelector("[data-ref='counter']")!);
};

document.addEventListener('DOMContentLoaded', index);
