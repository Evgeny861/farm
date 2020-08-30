
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
                            <th><input type="text" name="productName${Math.floor(Math.random() * Math.floor(123))}" value="${card.querySelector('.card-title').textContent}" readonly ></th>
                            <td><input type="text" name="quantity${Math.floor(Math.random() * Math.floor(123))}" value="${card.querySelector('.calc').value}" readonly ></td>
                            <td><input type="text" name="price${Math.floor(Math.random() * Math.floor(123))}" value="${calcPrice()}" readonly id="price"></td>
                            <svg width="35" height="35" fill="black" class="delite-img">
                            <use xlink:href="app/img/icons.svg#close"></use>
                            </svg>
                            `

        

        const globalCulcPrice = () => {
            const form = document.querySelector('form'),
            inputs = form.querySelectorAll('input');
            let culcArr = [];

            for (input of inputs) {
                if (input.id === 'price') {
                    culcArr.push(input.value)

                    const result = culcArr.reduce((sum, current) => {
                        return +sum + +current;
                    });

                    document.getElementById('calc-price').value = result;
                }
            }

        };


        const wrapperBascket = document.querySelector('.wrapper-bascket');
        const number = document.createElement('span');
        number.classList.add('right-cart-number');

        if (+card.querySelector('.calc').value !== 0) {
            tbody.appendChild(tr);
            globalCulcPrice();
            if (!document.querySelector('.right-cart-number')) {
                wrapperBascket.prepend(number);
            } 
            document.querySelector('.right-cart-number').textContent = document.querySelector('form').querySelectorAll('tr').length - 2;

        }
    
    }



    

    document.querySelector('body').addEventListener(('click'), (e) => {

        if (e.target === document.querySelector('.overlay') || e.target === document.querySelector('.close-rotate')) {
            document.getElementById('callback_form').style.display = 'none';
        } else if (e.target.closest('.car-main') || e.target.closest('.car')) {
            document.getElementById('callback_form').style.display = 'block';
        } else if (e.target.closest('.minus') &&  card.querySelector('.calc').value > 0 && e.target.parentNode.closest('.card') ) {
            if (card === e.target.parentNode.closest('.card')) {
                card.querySelector('.calc').value = +card.querySelector('.calc').value - 1;
            }
        } else if (e.target.closest('.plus') && e.target.parentNode.closest('.card') && e.target.parentNode.closest('.card')) {
            if (card === e.target.parentNode.closest('.card')) {
                card.querySelector('.calc').value = +card.querySelector('.calc').value + 1;
            }
        } else if (e.target.parentNode.closest('.card')) {
            if (card === e.target.parentNode.closest('.card')) {
                document.querySelector('.form-content').addEventListener(('click'), (e) => {
                    for (let btn of document.querySelectorAll('.delite-img')) {
                        if (e.target === btn) {
                            btn.parentElement.remove();
                            document.querySelector('.right-cart-number').textContent = document.querySelector('form').querySelectorAll('tr').length - 2;
                            document.getElementById('calc-price').value = +document.getElementById('calc-price').value - btn.parentElement.querySelectorAll('input')[2].value;
                            if (document.querySelector('.right-cart-number') && document.querySelector('.right-cart-number').textContent === '0') {
                                document.querySelector('.right-cart-number').remove();                                
                            }
                        }
                    }   
                })
            }
        }

        


        
    });

    button.addEventListener('click', (e) => {
        addProduct();
    })

    
    
}


const sendForm = form => {

    const errorMessage = 'Что то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    

const statusMessage = document.createElement('div');
statusMessage.classList.add('status-message');
statusMessage.style.cssText = 'font-size: 2rem;';
const deliteRow = () => {
    let table = document.querySelector('table'),
    row = table.querySelectorAll('tr');
    for (let i = 0; i <= row.length; i++) {
        if (i > 1 && row[i]) {
            row[i].remove();
        }
    }
}



    form.addEventListener('submit', event => {
        event.preventDefault();

        form.appendChild(statusMessage);
        const formData = new FormData(form);
        const body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });
        if (!statusMessage.textContent) {
            statusMessage.textContent = loadMessage;
        } else {
            statusMessage.textContent = '';
            statusMessage.textContent = loadMessage;
        }
        const input = form.querySelectorAll('input');
        for (let i = 0; i < input.length; i++) {
            if (input[i].value !== '') {
                input[i].value = '';
            }
        }
        
        const deliteMessage = () => {
            if (statusMessage) {
                form.removeChild(statusMessage);
            }
        };
        setTimeout(deliteMessage, 5000);

        const postData = body =>
            fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
    
    
        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                deliteRow();
                document.querySelector('.right-cart-number').textContent = document.querySelector('form').querySelectorAll('tr').length - 2;
                statusMessage.textContent = successMessage;
                if (document.querySelector('.right-cart-number') && document.querySelector('.right-cart-number').textContent === '0') {
                    document.querySelector('.right-cart-number').remove()             
                }
                
            })
            .catch(error => {
                console.log(error);
                deliteRow();
                document.querySelector('.right-cart-number').textContent = document.querySelector('form').querySelectorAll('tr').length - 2;
                statusMessage.textContent = errorMessage;
                if (document.querySelector('.right-cart-number') && document.querySelector('.right-cart-number').textContent === '0') {
                    document.querySelector('.right-cart-number').remove()
                }
            });
    
    });
}

sendForm(document.querySelector('form'))


window.addEventListener('scroll', function() {
    if (pageYOffset > 800 && pageYOffset < 2600 && outerWidth > 576) {
        document.querySelector('.wrapper-bascket').style.position = 'fixed'
    } else {
        document.querySelector('.wrapper-bascket').style.position = 'absolute'
    }
});

