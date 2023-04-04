const firstreq = new XMLHttpRequest();
firstreq.addEventListener('load', function() {
    console.log('It Worked!');
    const data = JSON.parse(this.responseText)
    console.log(data);
});

firstreq.addEventListener('error', () => {
    console.log('ERORR!!!!');   
})

firstreq.open('GET', 'https://swapi.dev/api/planets');
firstreq.send();
console.log('request sent!!');