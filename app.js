
// Get Elements

const skill_load    = document.querySelector('#skill-load');
const devs_add_form = document.querySelector('#devs_add_form');
const deve_list_add = document.querySelector('#deve_list_add');
const devs_edit_form= document.querySelector('#devs_edit_form')



// Load all skills form api
const loadskill = () => {
    axios.get('http://localhost:3000/skill').then(data => {
            let skill = '';

        data.data.map(skills => {

            skill += `
            <option value="${ skills.name }">${ skills.name }</option>
            `;
        });
        skill_load.insertAdjacentHTML('beforeend', skill);

    }) 
};

loadskill();
/**
 * ALL devs list
 */
const getDevelopers = () => {
    axios.get('http://localhost:3000/developers').then(res =>{
        let devs_data = '';
        res.data.map((devs, index )=> {
        devs_data += `
            <tr>
            <td>${ index + 1 }</td>
            <td>${ devs.name }</td>
            <td>${ devs.email }</td>
            <td>${ devs.skillId }</td>
            <td><img  src=" ${ devs.photo } " alt=""></td>
        <td>
            <a data-bs-toggle="modal"  class="btn btn-info btn-sm" onclick = "(modalSingalData( ${ devs.id } ))" href="#modal_view"><i class="fa fa-eye"></i></a> 
            <a data-bs-toggle="modal"  class="btn btn-warning btn-sm" onclick ="( editDeveloper( ${ devs.id } ) )" href="#modal_edit"><i class="fa fa-edit"></i></a>
            <a data-bs-toggle="modal"  class="btn btn-danger btn-sm" onclick = "( modalDeleteData(${ devs.id } ) )" href="#modal_delete"><i class="fa fa-trash"></i></a>
        </td>
        </tr>
        `
        })
        deve_list_add.innerHTML = devs_data;
    })
}

getDevelopers();
/**
 * add new devs
 */

devs_add_form.addEventListener('submit', function(e){
    e.preventDefault();
    let name  = this.querySelector('#name');
    let email = this.querySelector('#email');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skill-load');

    if ( name.value == '' &&  email.value == '' && skill.value == '' ) {

        alert('All fields are required !');
        
    } else {
        
    axios.post('http://localhost:3000/developers', {
        id       : "",
        name     : name.value,
        email    : email.value,
        skillId  : skill.value,
        photo    : photo.value
    }).then(res => {
        name.value  = "",
        email.value = "",
        photo.value = "",
        skill.value = "",
        getDevelopers();
    });
    }

});


/**
 * Edit developer data
 */

function editDeveloper(id){

    let name  = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let photo = document.getElementById('ephoto');
    let skill = document.getElementById('eskill-load');
    let epreview = document.getElementById('epreview');
    let  edit_id = document.getElementById('edit_id');

    
    axios.get(`http://localhost:3000/developers/${ id }`).then(res =>{

    name.value  = res.data.name;
    email.value = res.data.email;
    photo.value = res.data.photo;
    skill.value = res.data.skillId;
    edit_id.value = id;
    epreview.setAttribute('src', res.data.photo);



   

    });
}

devs_edit_form.addEventListener('submit', function(e) {  
    e.preventDefault();
    let name  = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let photo = this.querySelector('#ephoto');
    let skill = this.querySelector('#eskill-load');
    let  edit_id = document.querySelector('#edit_id');

    axios.patch(`http://localhost:3000/developers/${edit_id.value}`, {
        id       : "",
        name     : name.value,
        email    : email.value,
        skillId  : skill.value,
        photo    : photo.value
    }).then(res =>{
        name.value  = "",
        email.value = "",
        photo.value = "",
        skill.value = "",
        getDevelopers();
    });
   
});


// Delete Data Function 
const moal_Delete = document.getElementById('deldata');
function modalDeleteData(id) {
    moal_Delete.setAttribute('delid', id);
}

moal_Delete.addEventListener('click', function(){

    let del_id = this.getAttribute('delid');  
    axios.delete(`http://localhost:3000/developers/${ del_id }`).then(res =>{
        getDevelopers();
    });
    
});


/**
 * View Data
 */

function modalSingalData (id){

    let modal_view = document.getElementById('modal_view');
 

    axios.get(`http://localhost:3000/developers/${ id }`).then(res =>{
        modal_view.querySelector('.modal-body').innerHTML = `
        <div class="card">
        <img src="${res.data.photo}" alt="">
        <div class="card-body">
            <h2>${ res.data.name }</h2>
            <h3>${ res.data.skillId }</h3>
        </div>
        </div>
        `

    });
    
};

//! Major problem for me
// function modalSingalData (id){

//     let modal_view = document.getElementById('modal_view');
 

//     axios.get(`http://localhost:3000/developers/${id}`).then(res =>{
         
//         axios.get(`http://localhost:3000/skill/${id}`).then(skss => {
//             modal_view.querySelector('.modal-body').innerHTML = `
//             <div class="card">
//             <img src="${res.data.photo}" alt="">
//             <div class="card-body">
//                 <h2>${ res.data.name }</h2>
//                 <h3>${ skss.data.name }</h3>
//             </div>
//             </div>
//             `;
//         });

//     });
    
// };


