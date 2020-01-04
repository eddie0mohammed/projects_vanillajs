
import {ui} from './ui';

// get post on dom load
document.addEventListener('DOMContentLoaded', getPosts);

//listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//listen for delete
document.querySelector('.posts').addEventListener('click', deletePost); 

//listen for edit state
document.querySelector('.posts').addEventListener('click', enableEdit);

//listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);


async function getPosts(){
    try{
        const res = await fetch('http://localhost:3000/posts');
        const data = await res.json();

        ui.showPosts(data);

    }catch(err){
        console.log(err);
    }


}

async function submitPost(){
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;


    if (title === '' || body === ''){
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    }else{

       
        const data = {
            title: title,
            body: body
        }

         //check for ID
         if(id === ''){
            //create Post
    
                try{
                    const response = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data) 
                    });
            
                    // get all posts
                    await getPosts();
            
                    //show alert
                    ui.showAlert('Post Added', 'alert alert-success');
            
                    // clear inputs
                    ui.clearfields();
                    
            
            
                }catch(err){
                    console.log(err);
                }
        }else{
            //update post

            try{
                const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
                });
        
                // get all posts
                await getPosts();
        
                //show alert
                ui.showAlert('Post Updated', 'alert alert-success');
        
                ui.changeFormState('add');
                getPosts();
                
        
        
            }catch(err){
                console.log(err);
            }
            
        }
    
     

    }
    
    
}

async function deletePost(e){
    e.preventDefault();

    if (e.target.classList.contains('fa-remove')){
        const id = e.target.parentNode.dataset.id;
        const elem = e.target.parentNode.parentNode.parentNode;

        try{
            const res = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({id: id})

            });

            //show alert
            ui.showAlert('Post Removed', 'alert alert-success');
            //remove from ui
            getPosts();
            

        }catch(err){
            console.log(err);
        }
    }

}


function enableEdit(e){
    e.preventDefault();

    if (e.target.classList.contains('fa-pencil')){
        const id = e.target.parentNode.dataset.id;
        const body = e.target.parentNode.previousElementSibling.textContent;
        const title = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;

        const data = {
            id: id,
            title: title,
            body: body
        };

        //fill form with current post
        ui.fillForm(data);

    }
}


function cancelEdit(e){
    e.preventDefault();

    if (e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }

}