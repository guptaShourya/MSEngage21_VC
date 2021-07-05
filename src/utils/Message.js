const displayMessage = (author, message) => {
    const messageNode = document.createElement('span');
    messageNode.style.display = 'block';
    const authorSpan = document.createElement('span');
    authorSpan.style.fontWeight = 'bold';
    const authorNode = document.createTextNode(author + ": ");
    authorSpan.appendChild(authorNode);
    const textNode = document.createTextNode(message);
    const textSpan = document.createElement('span');
    textSpan.appendChild(textNode);
    messageNode.appendChild(authorSpan);
    messageNode.appendChild(textSpan);
    document.getElementById('text-area').appendChild(messageNode);
}
export default displayMessage;