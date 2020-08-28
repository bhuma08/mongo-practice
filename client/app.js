const oldList = document.querySelector('ul');
const form = document.querySelector('#form');

form.addEventListener('submit', submitNew);

//get the data as soon as it loads!
getAllLists()

function getAllLists(){
    fetch('http://localhost:3000/comedians')
        .then(r => r.json())
        .then(appendLists)
        .catch(console.warn)
};

function appendLists(data){
    console.log(data)
    data.comedians.forEach(appendList);
};

let newLi;
function appendList(data){
    newLi = document.createElement('li');
    const fullList = formatList(data, newLi)
    oldList.append(fullList);

    //if you just want to post old and create new, you can use below:
    // newLi.textContent = `Name: ${data.name} | Age: ${data.age}   |  Status: ${data.status}`
    // oldList.append(newLi)

    //BUT YOU NEED TO USE FORMATLIST FUNCTION TO UPDATE AND DELETE!!!!!
};


//create new data and add it on the list
function submitNew(e){
    e.preventDefault();

    const comedianData = {
        name: e.target.name.value,
        age: e.target.age.value,
        status: e.target.status.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(comedianData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/comedians', options)
        .then(r => r.json())
        .then(appendList)
        .catch(console.warn)
};



//update 
function updateData(id, li){
    const options = { 
        method: 'PATCH',
    };
    fetch(`http://localhost:3000/comedians/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const {comedians} = data
            formatList(comedians, li)
        })
        .catch(console.warn)
}


//delete
function deleteData(id, li){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/comedians/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}


//overall: To update, delete!
function formatList(data, li){
    const delBtn = document.createElement('button');
    const uptBtn = document.createElement('button');
    delBtn.textContent= 'Delete'
    uptBtn.textContent= 'Add 1'
    delBtn.onclick = () => deleteData(data.id, li)
    uptBtn.onclick = () => updateData(data.id, li)
    li.textContent = `Name: ${data.name} || Age: ${data.age} || Status: ${data.status}`
    li.append(delBtn)
    li.append(uptBtn)
    return li
}