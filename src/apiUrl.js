const apiUrl = process.env.NODE_ENV === "development" ? 'http://localhost:5000/api/v1/' : '';

export default apiUrl;