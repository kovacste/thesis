const tagMap = {
    'header': 'h1',
    'paragraph': 'p',
    'image': 'img',
};

document.addEventListener('DOMContentLoaded', function() {

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    fetch(`http://localhost:8000/api/content/${id}`)
        .then(response => response.json())
        .then(data => {

            let html = '';
            html += `<h1>${data.title}</h1>`;
            JSON.parse(data.content).forEach(item => {
                const tag = tagMap[item.type];
                if (tag === 'img') {
                    html += `<${tag} src="${item.data.file.url}">`;
                    return;
                }
                html += `<${tag}>${item.data.text}</${tag}>`;
            });
            document.getElementById('content').innerHTML = html;

        })
        .catch(error => console.error('Error:', error));
});
