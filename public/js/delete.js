const postIdInput = document.querySelector('input[name="post-id"]');
const delButton = document.querySelector('#del-post-btn');

const deletePost = async (postId) => {
  const response = await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

const handleDeleteButtonClick = async () => {
  const postId = postIdInput.value;
  await deletePost(postId);
};

if (delButton) {
  delButton.addEventListener('click', handleDeleteButtonClick);
}
