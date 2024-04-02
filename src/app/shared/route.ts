
export const RoleRoutes = {
    SuperAdmin: [
      // {
      //   name: "error", value: "MANAGE_DASHBOARD", isEnabled: false, routerLink: "/membership-error", acl: 'dashboard', subRoutes: []
      // },
      {
        name: "Dashboard", value: "MANAGE_DASHBOARD", isEnabled: false, routerLink: "/dashboard", acl: 'dashboard', subRoutes: []
      },
      {
        name: "Restaurant", isEnabled: false, value: "MANAGE_TELE_TAB", routerLink: "user-admin-list", acl: '', subRoutes: []
      },
      {
        name: "Profile", isEnabled: false, value: "MANAGE_TELE_TAB", routerLink: "distributor-list", acl: '', subRoutes: []
      },
      {
        name: "Notification", value: "MANAGE_ReI", isEnabled: false, routerLink: "super-notification-list", acl: 'dashboard', subRoutes: []
      },
      {
        name: "Privacy Policy", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/super-vendor-list", acl: '', subRoutes: []
      },
      {
        name: "Terms & Conditions", value: "MANAGE_ReI", isEnabled: false, routerLink: "/product-list-inventory", acl: '', subRoutes: []
      },
    ],



    Restaurant: [
      {
        name: "Order List", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", inactive_icon: "assets/images/appointment.png", icon: "assets/images/appointment1.png", routerLink: "/admin-user-dashboard", acl: '', subRoutes: []
      },
      {
        name: "Product", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/super-vendor-list", acl: '', subRoutes: []
      },
  
      {
        name: "Categories", value: "MANAGE_ReI", isEnabled: false, routerLink: "category-list", acl: '', subRoutes: []
      },
      {
        name: "Banners", value: "MANAGE_ReI", isEnabled: false, routerLink: "brand-list", acl: 'dashboard', subRoutes: []
      },
      {
        name: "Notification", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/generate-link", acl: '', subRoutes: []
      },
      {
        name: "Profile", value: "MANAGE_ReI", isEnabled: false, routerLink: "update-profile", acl: 'dashboard', subRoutes: []
      },
    ],
    // Vendor: [
    //   {
    //     name: "Orders", value: "MANAGE_ReI", isEnabled: false, routerLink: "orders-list", acl: '', subRoutes: []
    //   },
    //   // {
    //   //   name: "Orders", value: "MANAGE_ReI", isEnabled: false, routerLink: "inner", acl: '', subRoutes: []
    //   // },
  
    //   {
    //     name: "Product", value: "MANAGE_ReI", isEnabled: false, routerLink: "vendor-products-list", acl: '', subRoutes: []
    //   },
    //   {
    //     name: "Banners", value: "MANAGE_ReI", isEnabled: false, routerLink: "shop-banner-list", acl: 'dashboard', subRoutes: []
    //   },
    //   {
    //     name: "Categories", value: "MANAGE_ReI", isEnabled: false, routerLink: "category-list", acl: '', subRoutes: []
    //   },
  
      
  
    //   {
    //     name: "Profile", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/vendor-profile", acl: '', subRoutes: []
    //   },
    //   {
    //     name: "Subscription", isEnabled: true, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/membership-plan-list", acl: '', subRoutes: []
    //   },
    //   {
    //     name: "Notification", value: "MANAGE_ReI", isEnabled: false, routerLink: "vendor-notification-list", acl: 'dashboard', subRoutes: []
    //   },
  
    //   // {
    //   //   name: "Customer List", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/onLine-customer-list", acl: '', subRoutes: []
    //   // },
    //   // {
    //   //   name: "Delivery", value: "MANAGE_ReI", isEnabled: false, routerLink: "/vendor/setting/delivery-man-list", acl: 'dashboard', subRoutes: []
    //   // },
    //   // {
    //   //   name: "Customer", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/vendor/setting/customer-list", acl: '', subRoutes: []
    //   // },
    //   // {
    //   //   name: "Area", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "vendor/setting/area-list", acl: '', subRoutes: []
    //   // },
    
    //   {
    //     name: "Generate Link", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/generate-link", acl: '', subRoutes: []
    //   },
  
  
    // ],
   
    
    // Distributor: [
  
    //   {
    //     name: "Vendor", value: "MANAGE_ReI", isEnabled: false, routerLink: "distributor-vendor-list", acl: '', subRoutes: []
    //   },
    //   {
    //     name: "Earning", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/earning-list", acl: '', subRoutes: []
    //   },
    //   {
    //     name: "Profile", isEnabled: false, value: "MANAGE_APPOINTMENT_TAB", routerLink: "/distributor-profile", acl: '', subRoutes: []
    //   },
    // ],
  
  
  
  
  }
  