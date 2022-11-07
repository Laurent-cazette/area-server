const registerUser = async (userData: any) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export default registerUser;
