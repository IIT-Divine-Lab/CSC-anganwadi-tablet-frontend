const apiUrl = process.env.NODE_ENV === "development" ? 'http://localhost:5000/api/v1/' : 'https://cscanganwadi-c6be713ed90b.herokuapp.com/api/v1';

export default apiUrl;