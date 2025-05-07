document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html') // Assumes footer.html is in the same directory
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Could not load footer:', error);
                footerPlaceholder.innerHTML = '<p>Error loading footer content.</p>'; // Optional: display error message
            });
    }
});
