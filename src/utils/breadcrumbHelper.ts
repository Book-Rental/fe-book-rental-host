import { BreadcrumbItem } from "../config/breadcrumbConfig";

export const getBreadcrumb = (
  pathname: string,
  search: string
): BreadcrumbItem[] => {

  const params = new URLSearchParams(search);

  const orderId = params.get("orderId");
  const bookId = params.get("bookId");


  console.log("getBreadcrumb", {
    pathname,
    orderId,
    bookId
  });


  if (pathname === "/order-details" && orderId && bookId) {

    return [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Orders",
        path: "/orders",
      },
      {
        label: "Order Details",
        path: `/order-details?orderId=${orderId}`,
      },
      {
        label: "Book Details",
      },
    ];
  }


  if (pathname === "/order-details" && orderId) {

    return [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Orders",
        path: "/orders",
      },
      {
        label: "Order Details",
      },
    ];

  }


  return [];
};