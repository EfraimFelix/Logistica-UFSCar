// Login function
async function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = './pedidos.html';
        } else {
            throw new Error(data.message || 'Falha no login');
        }
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
    }
}

// Registration function
async function register(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;

    try {
        const response = await fetch('http://localhost:3000/usuario/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                senha,
                nome,
                sobrenome,
                is_admin: false
            })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = './login.html';
        } else {
            throw new Error(data.message || 'Falha no cadastro');
        }
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
    }
}

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = './login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = './login.html';
}
