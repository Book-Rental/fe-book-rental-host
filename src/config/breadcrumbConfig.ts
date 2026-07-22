export type BreadcrumbItem = {
  label: string;
  path?: string;
};


export const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  "/books": [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Books",
    },
  ],


  "/books-details": [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Books",
      path: "/books",
    },
    {
      label: "Book Details",
    },
  ],


  "/wishList": [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Wishlist",
    },
  ],


  "/cart": [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Books",
      path: "/books",
    },
    {
      label: "Cart",
    },
  ],


  "/profile": [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Profile",
    },
  ],


  "/orders": [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Orders",
    },
  ],


  "/order-details": [
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
  ],

};