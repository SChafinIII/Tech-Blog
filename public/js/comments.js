const postIdInput = document.querySelector('input[name="post-id"]');
const commentForm = document.querySelector('.comment-form');

if (commentForm) {
  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const commentInput = document.querySelector('textarea[name="comment-body"]');
    const comment = commentInput.value.trim();
    console.log(comment);
    
    if (comment) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          comment,
          postId: postIdInput.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  });
}
