// Get the post ID from the URL
const postId = window.location.pathname.split('/').pop();

// Handler function for submitting an edited post
const handleSubmit = async (event) => {
  event.preventDefault();

  // Get the updated title and content
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;

  try {
    // Send a PUT request to update the post
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Redirect to the dashboard if successful
    document.location.replace('/dashboard');

  } catch (error) {
    // Display an error message if there was a problem updating the post
    console.error(error);
    alert('There was a problem updating the post.');
  }
};

// Attach the handler to the edit form submit event
const editForm = document.querySelector('.edit-form');
if (editForm) {
  editForm.addEventListener('submit', handleSubmit);
}
