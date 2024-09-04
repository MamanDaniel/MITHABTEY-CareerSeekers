

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {


    options.credentials = 'include';
    const response = await fetch(url, options);
    if ( response.status === 401) {
        localStorage.removeItem('persist:root');
        wait(10000);
        window.location.href = '/signin';
    }
    if (!response.ok) {
        // Handle error response globally, if necessary
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
};

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

