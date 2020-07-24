data=[
    {
        'type': 'straat',
        'money': 60,
        'text1': 'Witbol',
        'text2': 'Duiven',
        'color': 'bruin'
    },
    {
        'type': 'straat',
        'money': 60,
        'text1': 'Amstelkade',
        'text2': 'Amstelhoek',
        'color': 'bruin'
    },
]

data.forEach(card => {

    document.querySelector('#list').innerHTML+=`
    <div class="card">
        <div class="color ${card.color}"></div>
        <div class="text1">${card.text1}</div>
        <div class="text2">${card.text2}</div>
        <div class="money">ƒ${card.money}</div>
    </div>
    `
    card
    
});

