function createDebugArea() {
    const debugDiv = document.createElement('div');
    debugDiv.id = 'debugArea';
    debugDiv.style.position = 'fixed';
    debugDiv.style.bottom = '10px';
    debugDiv.style.left = '10px';
    debugDiv.style.width = '300px';
    debugDiv.style.height = '150px';
    debugDiv.style.overflow = 'auto';
    debugDiv.style.backgroundColor = 'black';
    debugDiv.style.color = 'lime';
    debugDiv.style.padding = '10px';
    debugDiv.style.borderRadius = '5px';
    debugDiv.style.fontSize = '12px';
    debugDiv.style.zIndex = '1000';
    debugDiv.style.display = 'none'; // Initially hidden
    document.body.appendChild(debugDiv);

    // Create a toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Debug';
    toggleButton.style.position = 'absolute';
    toggleButton.style.top = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.zIndex = '1001';
    toggleButton.addEventListener('click', () => {
        debugDiv.style.display = debugDiv.style.display === 'none' ? 'block' : 'none';
    });
    document.body.appendChild(toggleButton);

    return debugDiv;
}

let debugArea = document.getElementById('debugArea') || createDebugArea();

export function debugLog(message) {
    const timeStamp = new Date().toLocaleTimeString();
    const messageLine = `[${timeStamp}] ${message}<br>`;
    debugArea.innerHTML += messageLine;
    debugArea.scrollTop = debugArea.scrollHeight; // Scroll to the bottom
}