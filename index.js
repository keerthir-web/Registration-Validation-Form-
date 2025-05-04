document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate age (18-55 years)
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dobError');
        const dob = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 18 || age > 55) {
            dobError.textContent = 'You must be between 18 and 55 years old to register.';
            return;
        } else {
            dobError.textContent = '';
        }
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        
        // Create user object
        const user = {
            name,
            email,
            password,
            dob: dobInput.value,
            acceptTerms
        };
        
        // Save to web storage
        saveUser(user);
        
        // Add to table
        addUserToTable(user);
        
        // Reset form
        this.reset();
    });
});

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user));
}

function addUserToTable(user) {
    const tableBody = document.querySelector('#userTable tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptTerms}</td>
    `;
    
    tableBody.appendChild(row);
}