var item = document.getElementsByClassName('list-group-item');
item[2].style.backgroundColor = "green"
for(let i = 0 ; i < item.length ; i++){
    item[i].style.fontWeight = 'bold';
}

function addLiItem( liContent ){
    const list = document.createElement('li')
    list.appendChild(document.createTextNode(liContent))
    document.querySelector('.list-group').appendChild(list)
}
 // time complexity of adding item is O(1)
addLiItem('Item 5')
