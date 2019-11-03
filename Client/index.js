document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    // loadPostLikes();

    const userForm = document.querySelector('#addUserForm');
    const postForm = document.querySelector('#addPostForm');
    const userPostsForm = document.querySelector('#displayUserPosts');
    const userPostLikesForm = document.querySelector('#displayUserPostLikes');

    userForm.addEventListener('submit', addUserFormSubmitted);
    postForm.addEventListener('submit', addPostFormSubmitted);
    userPostsForm.addEventListener('submit', loadUserPosts);
    userPostLikesForm.addEventListener('submit', loadUserPostLikes);

});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/users`);
    response.data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function loadPosts() {
    const postsList = document.querySelector('#postsList');
    postsList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts`);
    response.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `User ID: ${post.poster_id}, Post: ${post.body}`;
        postsList.appendChild(listItem);
    });
}

async function loadPostLikes() {
    const postLikes = document.querySelector('#postLikes');
    postLikes.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/likes???????????`);
    response.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `User ID: ${post.poster_id}, Post: ${post.body}`;
        postLikes.appendChild(listItem);
    });
}

async function loadUserPosts(event) {
    event.preventDefault();    
    const poster_id = document.querySelector('#user-id-posts').value;
    const userPostList = document.querySelector('#userPostList');
    userPostList.innerHTML = "";
    let response = await axios.get(`http://localhost:3000/posts/${poster_id}`);
    response.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `User ID: ${post.poster_id} - Message: ${post.body}`;
        userPostList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
}

async function addPostFormSubmitted(event) {
    event.preventDefault();    
    const poster_id = document.querySelector('#poster-id').value;
    const body = document.querySelector('#post-message').value;
    let response = await axios.post(`http://localhost:3000/posts/register`, { poster_id, body });
    loadPosts();
}

// async function addUserPostsForm(event) {
//     event.preventDefault();    
//     const poster_id = document.querySelector('#user-id-posts').value;
//     let response = await axios.get(`http://localhost:3000/posts/${poster_id}`);
//     loadUserPosts();
// }