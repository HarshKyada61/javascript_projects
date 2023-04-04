const input = document.querySelector("#username");

const addItem = document.querySelector('#addItem');
const itemList = document.querySelector('#itemlist');
addItem.addEventListener('keypress', function(e){
    if(e.key === 'Enter' ){
        if(!this.value) return;

        const newItemtext = this.value ;
        const newItem = document.createElement('li');
        newItem.innerText = newItemtext;
        itemList.appendChild(newItem);
        this.value = '';
    }
})