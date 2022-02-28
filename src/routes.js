/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Sellers from "views/sellers/ListSellers.js";
import FormSeller from "views/sellers/FormSeller.js";

var routes = [
  {
    path: "/index",
    name: "Sellers",
    icon: "ni ni-building text-primary",
    component: Sellers,
    layout: "/admin",
    show: false
  },
  {
    path: "/sellers",
    name: "Sellers",
    icon: "ni ni-building text-primary",
    component: Sellers,
    layout: "/admin",
  },
  {
    path: "/sellers/form/:id?",
    name: "Seller Form",
    icon: "ni ni-building text-primary",
    component: FormSeller,
    layout: "/admin",
    show: false,
  },
];
export default routes;
