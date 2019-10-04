import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPaging } from '../models/common';

const IP_URL = environment.apiUrl + '/ips';

@Injectable({
    providedIn: 'root'
})
export class IpService {
    constructor(private http: HttpClient) { }

    get(id: number) {
        return this.http.get<IIp>(`${IP_URL}/${id}`);
    }

    getList(page: number = 1, size: number = 10): Observable<IPaging<IIp>> {
        return this.http.get<IPaging<IIp>>(`${IP_URL}?page=${page}&size=${size}`);
    }

    addIp(data: IIp) {
        return this.http.post(`${IP_URL}`, data, { observe: "response" });
    }

    updateIp(data: IIp) {
        return this.http.put(`${IP_URL}/${data.id}`, data, { observe: "response" });
    }

    delete(id: number) {
        return this.http.delete<IIp>(`${IP_URL}/${id}`, { observe: "response" });
    }

    lock(id: number, lock: boolean) {
        return this.http.put(`${IP_URL}/${id}/lock`, { lock }, { observe: "response" });
    }
}

export interface IIp {
    id: number;
    from?: Date;
    to?: Date;
    ip: string;
    requestedBy: string;
    reason: string;
}
