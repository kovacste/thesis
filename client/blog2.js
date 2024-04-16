document.addEventListener('DOMContentLoaded', function() {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    fetch(`http://localhost:8000/api/content/${id}`)
        .then(response => response.json())
        .then(data => {
            parseContent(data.content, 'content');
        })
        .catch(error => console.error('Error:', error));
});
