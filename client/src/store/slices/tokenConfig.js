export default function tokenConfig(getState){
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    if(token){
        config.headers['x-auth-token'] = token;
    };

    return config;
};