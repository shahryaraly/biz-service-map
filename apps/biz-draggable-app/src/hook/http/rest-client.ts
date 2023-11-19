import { useState, useEffect } from "react";
import { ReqModel, RequestType } from "./rest-req-model";

const useAxio = () => {
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [controller, setController] = useState<any>(null);

    const send = async (reqModel: ReqModel) => {
        try {
            setLoading(true);
            const abortController = new AbortController();
            setController(abortController);
            const methodType = (Object.values(RequestType).at(reqModel.method.valueOf())?.toString().toLowerCase());
            const res = await reqModel.axiosInstance[methodType ? methodType : ""](reqModel.url, {
                ...reqModel.payload
            });
            setResponse(res);
            if (reqModel.successCallback)
                reqModel.successCallback(res);
        }
        catch (error) {
            setError("error occured");
        }
        finally {
            setLoading(false);
            console.log(reqModel, response, loading, error);
        }
    }
    useEffect(() => {
        return () => controller && controller.abort();
    })
    return [response, error, loading, send];
};

export default useAxio;