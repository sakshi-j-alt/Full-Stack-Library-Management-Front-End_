const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

function displaiInfo() {
    const userInfo = document.getElementById('UserInfo');
    userInfo.innerHTML = `
        
        <p><strong>Name:</strong> ${currentUser.id}</p>
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Phone:</strong> ${currentUser.phone}</p>
        <p><strong>User Type:</strong> ${currentUser.userType}</p>
    `;

}
displaiInfo();