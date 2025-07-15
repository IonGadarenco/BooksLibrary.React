import { useApi } from "../api/axiosInstance";
import type { AuthResponseDto } from "../models/dtos/authResponseDto";
import type { PagedRequestType } from "../models/types/PagedRequestType";
import type { PagedResultType } from "../models/types/PagedResultType";

const authServices = () => {
const api = useApi();

const syncResponse = async () => await api.post<AuthResponseDto>('/Auth/synk');
const pagedResponse = async (request: PagedRequestType) => await  api.post<PagedResultType>('books/paged', request)
  return {
    syncResponse,
    pagedResponse
  };
}

export default authServices