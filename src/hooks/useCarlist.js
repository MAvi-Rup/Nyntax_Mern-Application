import { useEffect, useState } from 'react';

const useCarList = () => {
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarList = async () => {
            try {
                const response = await fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList');
                if (!response.ok) {
                    throw new Error('Failed to fetch car data');
                }
                const data = await response.json();
                setCarList(data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCarList();
    }, []);

    return { carList, loading, error };
};

export default useCarList;
