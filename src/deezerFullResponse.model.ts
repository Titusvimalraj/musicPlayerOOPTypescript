
import deezerDataResponse from "./deezerDataResponse.model";

interface deezerFullResponse {
    data: deezerDataResponse[];
    previous: string;
    next: string;
    total: number;
}

export default deezerFullResponse;