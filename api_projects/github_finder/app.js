//instantiate classes
const github = new Github();
const ui = new UI();

// Search input

const searchUser = document.getElementById('searchUser');

//search input event listener
searchUser.addEventListener('keyup', async (e) => {
    //get input text
    const text = e.target.value;

    if (text !== ''){
        
        // github.getUser(text)
        // .then(data => {
        //     console.log(data);
        // })
        const result = await github.getUser(text);

        if (result.profile.message === 'Not Found'){
            //show alert
            ui.showAlert('User not found', 'alert alert-danger');

        }else{
            //show profile
            ui.showProfile(result.profile);
            ui.showRepos(result.repos);

        }
    }else{
        //clear profile
        ui.clearProfile();

    }

})