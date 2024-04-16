const tagMap = {
    'header': 'h1',
    'paragraph': 'p',
    'image': 'img',
};

function parseContent(content, contentRootId) {
    let html = '';
    JSON.parse(content).forEach(item => {
        const tag = tagMap[item.type];
        if (tag === 'img') {
            html += `<${tag} src="${item.data.file.url}">`;
            return;
        }
        html += `<${tag}>${item.data.text}</${tag}>`;
    });
    document.getElementById(contentRootId).innerHTML = html;
}
