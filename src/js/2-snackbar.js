import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', (event)=>{
    event.preventDefault();
    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

        const promis = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state ==='fulfilled'){
                    resolve(delay)
                } else {
                    reject(delay);
                }
                }, delay);
});

                promis
                    .then (delay => {
                        console.log(`✅ Fulfilled promise in ${delay}ms`)
                        iziToast.success({
                            message: `✅ Fulfilled promise in ${delay}ms`,
                            position: 'topCenter',
                            color: 'green',
                            progressBar: false,
                            icon: false,
                            transitionIn: 'none',
                            transitionOut: 'none',
                        });
                    })
                    .catch (delay =>{
                        console.log(`❌ Rejected promise in ${delay}ms`);
                        iziToast.error({
                            message: `❌ Rejected promise in ${delay}ms`,
                            position: 'topCenter',
                            color: 'red',
                            progressBar: false,
                            icon: false,
                            transitionIn: 'none',
                            transitionOut: 'none',
                        });
                    })
                    formEl.reset();

});



