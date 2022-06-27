import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImportService {
  constructor(private _httpClient: HttpClient) {}

  getData(): Observable<any> {
    let url = `https://jsonplaceholder.typicode.com/users`;
    const container = <ContainerData>{};
    return this._httpClient.get(url).pipe(
      catchError(this.handleError),
      map((res: any) => {
        return res.map((element: Result) => {
          (container["id"] = container["id"] || []).push(element.id);
          (container["benchmark"] = container["benchmark"] || []).push(
            element.id * 100
          );
          // or
          // (container["benchmark"]? container["benchmark"]: (container["benchmark"] = [])).push(data.id * 100);
          container.values = [
            1500, 800, 1500, 1600, 2000, 3000, 1500, 200, 8000,
          ];
          return container;
        });
      })
    );
  }

  /**
   * Get Errors
   *
   * @returns {errorMessage}
   */
  handleError(error: { error: { message: any }; status: any; message: any }) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client-Side Error : ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Server-Side Error : ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      const error: any = new Error(errorMessage);
      error.timestamp = Date.now();
      console.log(error.timestamp);
      return error;
    });
  }
}

type ContainerData = {
  benchmark: any[];
  id: any[];
  values: any[];
};

interface Result {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
