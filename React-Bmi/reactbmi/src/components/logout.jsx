import { useEffect } from 'react';

function Logout() {
    useEffect(() => {
        fetch('http://localhost/BMI_USING_PHP/BMI-PHP-/php/logout.php', {
            method: 'POST',
        })
            .then(() => {
                window.location.href = '/login';
            });
    }, []);

    return null;
}

export default Logout;
