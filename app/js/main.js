new WOW().init();

var mySwiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        bulletClass: 'projects-bullet',
        bulletActiveClass: 'projects-bullet-active',
        clickable: true
    },
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    speed: 700,
    spaceBetween: 100
});











































let cards = document.querySelectorAll('.card');

for (let card of cards) {
    let button = card.querySelector('.main-button-car');


    const addProduct = () => {

        let calcPrice = () => {
            if (+card.querySelector('.calc').value !== 0 && +card.querySelector('.calc').value !== 0) {
                return card.querySelector('.calc').value * card.querySelector('.price').value;
            } else {
                return card.querySelector('.price').value;
            }
    }   

        const tbody = document.querySelector('tbody');
    
        const tr = document.createElement('tr');
        tr.innerHTML = `
                            <th>${card.querySelector('.card-title').textContent}</th>
                            <td><input type="text" name="quantity" value="${card.querySelector('.calc').value}" readonly id="quantity"></td>
                            <td><input type="text" name="price" value="${calcPrice()}" readonly id="price"></td>
                            <svg width="35" height="35" fill="black" class="delite-img">
                            <use xlink:href="app/img/icons.svg#close"></use>
                            </svg>
                            `

        

        const globalCulcPrice = () => {
            const form = document.querySelector('form'),
            inputs = form.querySelectorAll('input');
            let culcArr = [];

            for (input of inputs) {
                if (input.name === 'price') {
                    culcArr.push(input.value)

                    const result = culcArr.reduce((sum, current) => {
                        console.log(sum, current);
                        return sum * current;
                    });

                    document.getElementById('calc-price').value = result;
                }
            }

        };

        if (+card.querySelector('.calc').value !== 0) {
            tbody.append(tr);
            globalCulcPrice();
        }
    
    }



    

    document.querySelector('body').addEventListener(('click'), (e) => {

        if (e.target === document.querySelector('.overlay') || e.target === document.querySelector('.close-rotate')) {
            document.getElementById('callback_form').style.display = 'none';
        } else if (e.target.closest('.minus') &&  card.querySelector('.calc').value > 0 && e.target.parentNode.closest('.card') ) {
            if (card === e.target.parentNode.closest('.card')) {
                card.querySelector('.calc').value = +card.querySelector('.calc').value - 1;
            }
        } else if (e.target.closest('.plus') && e.target.parentNode.closest('.card') && e.target.parentNode.closest('.card')) {
            if (card === e.target.parentNode.closest('.card')) {
                card.querySelector('.calc').value = +card.querySelector('.calc').value + 1;
            }
        }
    });






    button.addEventListener('click', (e) => {
        document.getElementById('callback_form').style.display = 'block';
        console.log("Кнопка",button);
        console.log("id card ",card.id);
        console.log("Название",card.querySelector('.card-title').textContent);
        console.log('Цена',card.querySelector('.price').value);
        console.log('Количество', card.querySelector('.calc').value);

        addProduct();
    })
    
    
}



