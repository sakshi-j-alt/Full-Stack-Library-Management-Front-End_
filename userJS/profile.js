const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

function displaiInfo() {
    const userInfo = document.getElementById('UserInfo');
    userInfo.innerHTML = `
        
        <p><strong>Name:</strong> ${getUserId()}</p>
        <p><strong>Name:</strong> ${getName()}</p>
        <p><strong>Email:</strong> ${getUserEmail()}</p>
        <p><strong>Phone:</strong> ${getPhone()}</p>
        <p><strong>User Type:</strong> ${getUserType()}</p>
    `;

}
displaiInfo();