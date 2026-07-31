// API Base URL
const API_BASE_URL = '/api/v1';

// Handle URL Shortening
const shortenForm = document.getElementById('shorten-form');
if (shortenForm) {
    shortenForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const originalUrl = document.getElementById('originalUrl').value;
        const customAlias = document.getElementById('customAlias').value.trim();
        const submitBtn = document.getElementById('submit-btn');
        const errorContainer = document.getElementById('error-message');
        
        // Reset states
        errorContainer.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing...</span>';
        
        const payload = {
            originalUrl: originalUrl
        };
        
        if (customAlias) {
            payload.customAlias = customAlias;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/urls`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Success
                document.getElementById('shorten-form').classList.add('hidden');
                document.getElementById('result-container').classList.remove('hidden');
                
                const shortUrl = data.shortUrl;
                document.getElementById('shortUrlOutput').value = shortUrl;
                
                // Extract code from URL for analytics link
                const urlObj = new URL(shortUrl);
                const code = urlObj.pathname.substring(1);
                document.getElementById('analytics-link').href = `analytics.html?code=${code}`;
                
            } else {
                // Handle Errors
                let errorMsg = data.message || 'An error occurred while shortening the URL.';
                
                // Handle validation errors (Map)
                if (!data.message && Object.keys(data).length > 0) {
                    errorMsg = Object.values(data).join('<br>');
                }
                
                errorContainer.innerHTML = errorMsg;
                errorContainer.classList.remove('hidden');
            }
        } catch (error) {
            errorContainer.innerHTML = 'Network error. Please make sure the backend is running.';
            errorContainer.classList.remove('hidden');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Shorten URL</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
        }
    });
    
    // Copy to clipboard
    document.getElementById('copy-btn').addEventListener('click', function() {
        const urlInput = document.getElementById('shortUrlOutput');
        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(urlInput.value).then(() => {
            const btn = this;
            const originalHTML = btn.innerHTML;
            btn.classList.add('copied');
            btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalHTML;
            }, 2000);
        });
    });
    
    // Reset form
    document.getElementById('shorten-another').addEventListener('click', () => {
        document.getElementById('shorten-form').reset();
        document.getElementById('shorten-form').classList.remove('hidden');
        document.getElementById('result-container').classList.add('hidden');
    });
}

// Handle Analytics
async function fetchAnalytics(code) {
    const errorContainer = document.getElementById('analytics-error');
    const dashboard = document.getElementById('analytics-dashboard');
    const submitBtn = document.querySelector('#analytics-search-form button');
    
    errorContainer.classList.add('hidden');
    dashboard.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/${code}`);
        const data = await response.json();
        
        if (response.ok) {
            // Update Dashboard
            document.getElementById('total-clicks').textContent = data.totalClicks;
            document.getElementById('today-clicks').textContent = data.todayClicks;
            
            populateList('browser-stats', data.browserStats);
            populateList('os-stats', data.osStats);
            populateList('country-stats', data.countryStats);
            
            dashboard.classList.remove('hidden');
        } else {
            errorContainer.innerHTML = data.message || 'No analytics found for this code or code does not exist.';
            errorContainer.classList.remove('hidden');
        }
    } catch (error) {
        errorContainer.innerHTML = 'Network error. Could not fetch analytics.';
        errorContainer.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'View Stats';
    }
}

function populateList(elementId, statsObject) {
    const ul = document.getElementById(elementId);
    ul.innerHTML = '';
    
    if (!statsObject || Object.keys(statsObject).length === 0) {
        ul.innerHTML = '<li><span class="label">No data available</span><span class="value">-</span></li>';
        return;
    }
    
    // Sort by count descending
    const sortedStats = Object.entries(statsObject).sort((a, b) => b[1] - a[1]);
    
    sortedStats.forEach(([label, count]) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="label">${label}</span><span class="value">${count}</span>`;
        ul.appendChild(li);
    });
}
