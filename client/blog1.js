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
        })
        .catch(error => console.error('Error:', error));
});


