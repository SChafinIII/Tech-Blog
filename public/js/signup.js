const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
  
    const usernameInput = document.querySelector('#username-signup');
    const passwordInput = document.querySelector('#password-signup');
  
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim(),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Something went wrong!');
    }
  };
  
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', handleSignupFormSubmit);
  