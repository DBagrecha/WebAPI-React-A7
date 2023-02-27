import http from "../http-common";
import employee from "../types/employee"

class employeeService {
    getAll() {
        return http.get<Array<employee>>("/Emp");
    }

    get(id: string) {
        return http.get<employee>(`/Emp/${id}`);
    }

    create(data: employee) {
        return http.post<employee>("/Emp/add", data);
    }

    update(data: employee, id: any) {
        return http.put<employee>(`/Emp/${id}`, data);
    }

    delete(id: any) {
        return http.delete(`/Emp/${id}`);
    }
}

export default new employeeService();