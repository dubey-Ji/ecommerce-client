import { useEffect, useState } from 'react';


const useGetCookie = (name) => {
    const [cookie, setCookie] = useState(null);
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return null;
    };
    useEffect(() => {
        const cookieValue = getCookie(name);
        setCookie(cookieValue);
    }, [name]);
    return cookie;
}

export default useGetCookie;