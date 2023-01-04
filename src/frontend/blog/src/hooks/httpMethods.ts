import { useCallback, useState } from "react"
import API_SERVER from "../shared/consts";
import HttpMethod from "../shared/HttpMethod"

const useHttpMethod = <DataType>(url: string, method: HttpMethod, req?: DataType) => {
    const [rsp, setResponse] = useState<DataType>();
    const [err, setError] = useState<boolean>(false);
    const httpMethod = useCallback(async () => {
        try {
            const response = await fetch(`${API_SERVER}/${url}`, {
                "method": method,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(req)
            });
            const data = await response.json();
            setResponse({...data});
        }
        catch (error) {
            console.log(error)
            setError(true);
        }
    }, [url, method, req]);

    return[httpMethod, rsp, err];
}

export default useHttpMethod;