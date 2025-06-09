document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to navigation links
    document.querySelectorAll('.nav-list a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add random rotation to items
    const items = document.querySelectorAll('.photo-item, .document-item, .map-item');
    items.forEach(item => {
        const rotation = Math.random() * 6 - 3; // Random rotation between -3 and 3 degrees
        item.style.transform = `rotate(${rotation}deg)`;
    });

    // Create string connections
    const board = document.querySelector('.board-content');
    const stringOverlay = document.querySelector('.string-overlay');
    
    function createStringConnections() {
        const items = document.querySelectorAll('.photo-item, .document-item, .map-item');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        
        // Create a more natural connection pattern
        const connections = [];
        items.forEach((item, index) => {
            // Connect to 2-3 nearby items
            const numConnections = Math.floor(Math.random() * 2) + 2;
            for (let i = 0; i < numConnections; i++) {
                let targetIndex;
                if (i === 0) {
                    // Connect to next item
                    targetIndex = (index + 1) % items.length;
                } else {
                    // Connect to a random item
                    targetIndex = Math.floor(Math.random() * items.length);
                    if (targetIndex === index) {
                        targetIndex = (targetIndex + 1) % items.length;
                    }
                }
                
                const target = items[targetIndex];
                
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                const rect1 = item.getBoundingClientRect();
                const rect2 = target.getBoundingClientRect();
                const boardRect = board.getBoundingClientRect();
                
                // Calculate connection points from the pins
                const x1 = rect1.left + rect1.width/2 - boardRect.left;
                const y1 = rect1.top + 15 - boardRect.top; // Connect from the pin
                const x2 = rect2.left + rect2.width/2 - boardRect.left;
                const y2 = rect2.top + 15 - boardRect.top; // Connect to the pin
                
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', '#c0392b');
                line.setAttribute('stroke-width', '1.5');
                line.setAttribute('opacity', '0.6');
                
                // Add slight curve to the line
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2 - Math.random() * 20 - 10;
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`);
                path.setAttribute('stroke', '#c0392b');
                path.setAttribute('stroke-width', '1.5');
                path.setAttribute('opacity', '0.6');
                path.setAttribute('fill', 'none');
                
                svg.appendChild(path);
                connections.push({ from: index, to: targetIndex, element: path });
            }
        });
        
        board.insertBefore(svg, stringOverlay);
        
        // Add hover effect to connected items
        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                connections.forEach(conn => {
                    if (conn.from === index || conn.to === index) {
                        conn.element.setAttribute('stroke-width', '2.5');
                        conn.element.setAttribute('opacity', '1');
                    }
                });
            });
            
            item.addEventListener('mouseleave', () => {
                connections.forEach(conn => {
                    if (conn.from === index || conn.to === index) {
                        conn.element.setAttribute('stroke-width', '1.5');
                        conn.element.setAttribute('opacity', '0.6');
                    }
                });
            });
        });
    }
    
    // Create string connections after a short delay to ensure all elements are properly positioned
    setTimeout(createStringConnections, 500);
    
    // Recreate string connections on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldSvg = board.querySelector('svg');
            if (oldSvg) {
                oldSvg.remove();
            }
            createStringConnections();
        }, 250);
    });
}); 