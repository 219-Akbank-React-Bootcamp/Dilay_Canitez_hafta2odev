//form templates

const contactFormTemplate = [
    { name: "contact_name", title: "Name", type: "text" },
    { name: "contact_surname", title: "Surname", type: "text" },
    { name: "contact_balance", title: "Balance", type: "number" },
  ];
  const productFormTemplate = [
    { name: "product_name", title: "Name", type: "text" },
    { name: "product_quantity", title: "Quantity", type: "number" },
    { name: "product_price", title: "Price", type: "number" },
  ];
  const transferFormTemplate = {
    title: "Transfer",
    fields: [
      {
        id: "transfer_sender",
        name: "sender",
        title: "Sender",
        type: "select",
        options: "userlist",
      },
      {
        id: "transfer_receiver",
        name: "receiver",
        title: "Receiver",
        type: "select",
        options: "userlist",
      },
      { id: "transfer_amount", name: "amount", title: "Amount", type: "number" },
    ],
    buttonName: "Transfer",
  };
  const salesFormTemplate = {
    title: "Sales",
    fields: [
      {
        id: "sales_sender",
        name: "sender",
        title: "Sender",
        type: "select",
        options: "userlist",
      },
      {
        id: "sales_receiver",
        name: "receiver",
        title: "Receiver",
        type: "select",
        options: "userlist",
      },
      {
        id: "sales_product",
        name: "product",
        title: "Product",
        type: "select",
        options: "productlist",
      },
    ],
    buttonName: "Sell",
  };