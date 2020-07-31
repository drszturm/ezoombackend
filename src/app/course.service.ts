import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  ordersByCustomer:any
  customerData: any;
  orderResp:any;
  paymentGateways:any;
  products: any;
  product: any;
  categories: any;
  tags: any;
  apiURL: string = '';
  siteURL: string = 'https://hasan.online/woocomapp';//
  woocomPart: string = '/wp-json/wc/v3/';
  consumerKey: string = 'ck_56a47e58bf9045f99e0df42dd321c09049752781';
  consumerSecret: string = 'cs_b8a4fe3ab410912dd93b34aafa5197a19aa7372a';

  constructor(private http: HttpClient) { }


  getAllStoreProducts(){
    this.apiURL = `${this.siteURL}${this.woocomPart}products?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
    console.log('API URL for all store products: ',this.apiURL);
    this.products = this.http.get('http://localhost:8888/ezoom/api/course'); 
    return this.products;
  }

  getSingleProduct(pId){
    this.apiURL = `http://localhost:8888/ezoom/api/course/${pId}`;
    console.log('API URL for single product: ',this.apiURL);
    this.product = this.http.get(this.apiURL);
    return this.product;
  }


// convert javascript object to x-www-form-urlencoded format
JSON_to_URLEncoded(element, key?, list?) {
  var list = list || [];
  if (typeof element == "object") {
    for (var idx in element)
      this.JSON_to_URLEncoded(
        element[idx],
        key ? key + "[" + idx + "]" : idx,
        list
      );
  } else {
    list.push(key + "=" + encodeURIComponent(element));
  }
  return list.join("&");
}

placeOrder(orderDataObj){
  let headers = new HttpHeaders ({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  let orderData = this.JSON_to_URLEncoded(orderDataObj);

  this.apiURL = `${this.siteURL}${this.woocomPart}orders?consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
  console.log('API URL for order: ', this.apiURL);

  return new Promise ((resolve) => {
    this.orderResp = this.http.post(this.apiURL,orderData, {headers});
    this.orderResp.subscribe((responseData) => {
      resolve(responseData);
    });
  });

}

getOrdersByCustomer(customerId){
  this.apiURL = `${this.siteURL}${this.woocomPart}orders?customer=${customerId}&consumer_key=${this.consumerKey}&consumer_secret=${this.consumerSecret}`;
  console.log('Orders by a customer: ', this.apiURL);
  this.ordersByCustomer = this.http.get(this.apiURL);
  return this.ordersByCustomer;
}


}
