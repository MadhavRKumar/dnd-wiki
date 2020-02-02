import { useEffect, useState } from "react";

export default function useLoading() {
    let [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return isLoading;
}