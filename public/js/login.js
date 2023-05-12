const login = document.querySelector('#login-form');

login.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const username = loginForm.elements['username-login'].value;
  const password = loginForm.elements['password-login'].value;

  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      document.location.href = '/dashboard';
    } else {
      throw new Error('Invalid login credentials');
    }
  } catch (error) {
    alert(error.message);
  }
});
