document.getElementById('searchButton').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    const resultsDiv = document.getElementById('results');

    try {
        const response = await fetch(`http://localhost:3000/search?keyword=${keyword}`);
        const data = await response.json();

        if (data.success) {
            resultsDiv.innerHTML = '<h2>Results:</h2>';
            data.datasets.forEach(dataset => {
                resultsDiv.innerHTML += `<div>
                    <h3><a href="${dataset.url}" target="_blank">${dataset.title}</a></h3>
                    <p>${dataset.description}</p>
                </div>`;
            });
        } else {
            resultsDiv.innerHTML = '<p>No results found</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Error fetching results. Please try again.</p>';
    }
});
