document.addEventListener('DOMContentLoaded', function() {

    async function fetchSomething() {
        const response = await fetch('https://something');
        const json = await response.json();
        console.log(json);
    }

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    fetch(`http://localhost:8000/api/content/${id}`)
        .then(response => response.json())
        .then(data => {
            parseContent(data.content, 'content');
            document.getElementById('title').innerText = data.title;
            data.tags.split(',').slice(0,-1).forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.innerText = tag;
                tagElement.classList.add('tag');
                document.getElementById('tags').appendChild(tagElement);
            });
            document.getElementById('publishDate').innerText = data.created_at.substring(0, 10);
        })
        .catch(error => console.error('Error:', error));
});


