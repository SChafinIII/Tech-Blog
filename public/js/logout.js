const logoutHandler = async () => {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        alert('You have been logged out!');
        document.location.replace('/');
      } else {
        throw new Error('Failed to log out');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logoutHandler);
  