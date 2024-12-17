export async function getGenres() {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();
    return json.results;
}

export async function getPlatforms() {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();
    // console.log('Platforms Response:', json);
    return json.results;
}

export async function Filters() {
    const genres = await getGenres();
    const platforms = await getPlatforms();
    // console.log({ genres, platforms });
    return { genres, platforms };
}