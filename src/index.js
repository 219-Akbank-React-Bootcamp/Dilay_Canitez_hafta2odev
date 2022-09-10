//select main elements
const contactForm = document.getElementById("contact-form");
const productForm = document.querySelector("#product-form");
const userTable = document.getElementById("user-table");
const productTable = document.getElementById("product-table");
const historyTable = document.getElementById("history-table");
const transferForm = document.getElementById("transfer-form");
const salesForm = document.getElementById("sales-form");
const transactionHistoryBtn = document.querySelector("#transaction-history");
const productHistoryBtn = document.querySelector("#product-history");
const sellProductBtn = document.querySelector("#product-sell");

//data state control
const state = {
  userList: [],
  productList: [],
  history: [],
  currentUser: "",
  currentProduct: "",
};

const setState = (name, newState) => {
  state[name] = [...state[name], newState];
};

//functions
const selectUser = (id) => {
  state.currentUser = id;
  userTable.querySelector(".active-row")?.classList.remove("active-row");
  document.getElementById(id).classList.add("active-row");
};
const selectProduct = (id) => {
  state.currentProduct = id;
  productTable.querySelector(".active-row")?.classList.remove("active-row");
  document.getElementById(id).classList.add("active-row");
};

const listTransactionHistory = () => {
  historyTable.innerHTML = state.history
    .filter((x) => x.userId === state.currentUser)
    .map(
      (item) =>
        `<tr id="${item.id}">
            <td>${item.userId}</td>
            <td>${item.details}</td>
            <td>${item.createdAt}</td>
        </tr>`
    )
    .join(" ");
};
const listProducts = () => {
  const user = state.userList.find((x) => x.id === state.currentUser);
  console.log(user);
  historyTable.innerHTML = user.products
    .map(
      (product) =>
        `<tr id="${product.id}">
              <td>${user.userId}</td>
              <td>${product.name}</td>
              <td>${product.purchaseDate}</td>
          </tr>`
    )
    .join(" ");
};
const sellProduct = () => {
  const product = state.productList.find((x) => x.id === state.currentProduct);
  const user = state.userList.find((x) => x.id === state.currentUser);
  if (product && user.balance >= product.price) {
    const userProduct = user.products.find(
      (x) => x.id === state.currentProduct
    );
    if (userProduct) {
      userProduct.quantity += 1;
    } else {
      user.products = [...user.products, { ...product, quantity: 1 }];
    }
    user.balance -= product.price;
    product.quantity -= 1;
    const newHistory = {
      id: Math.round(Math.random() * 1000),
      userId: user.id,
      createdAt: new Date().toLocaleString(),
      details: `user purchased ${product.name}`,
    };
    setState("history", newHistory);
  } else {
    alert("Please select a product from the list ");
  }
  updateUserTable();
  updateProductTable();
  updateSelectOptions();
};

//render functions
const updateUserTable = () => {
  //update user table
  userTable.innerHTML = state.userList
    .map(
      (user) =>
        `<tr id="${user.id}" onclick="selectUser(${user.id})">
  <td>${user.name} ${user.surname}</td>
  <td>${user.balance}</td>
</tr>`
    )
    .join(" ");
};
const updateProductTable = () => {
  //update product table
  productTable.innerHTML = state.productList
    .map(
      (product) =>
        `<tr id="${product.id}" onclick="selectProduct(${product.id})">
    <td>${product.name}</td>
    <td>${product.quantity}</td>
    <td>$ ${product.price}</td>
  </tr>`
    )
    .join(" ");
};
const updateSelectOptions = () => {
  //update sender-receiver fields
  document.querySelectorAll(".userlist").forEach((element) => {
    element.innerHTML = `<option value="">Choose Product..</option> ${state.userList
      .map(
        (user) =>
          `<option value="${user.id}">${user.name} ${user.surname}</option>`
      )
      .join(" ")}`;
  });
};
const updateProductSelectOption = () => {
  const senderId = parseInt(document.getElementById("sales_sender").value);
  const senderUser = state.userList.find((x) => x.id === senderId);
  document.querySelector(
    ".productlist"
  ).innerHTML = `<option value="">Choose..</option>${senderUser.products
    .map((product) => `<option value="${product.id}">${product.name}</option>`)
    .join(" ")}`;
};

const handleAddUser = (e) => {
  e.preventDefault();
  const contactName = document.getElementById("contact_name").value;
  const contactSurname = document.getElementById("contact_surname").value;
  const contactBalance = document.getElementById("contact_balance").value;

  const newUser = {
    id: Math.round(Math.random() * 1000),
    name: contactName,
    surname: contactSurname,
    balance: parseInt(contactBalance),
    products: [],
  };
  //create history for the user
  const newHistory = {
    id: Math.round(Math.random() * 1000),
    userId: newUser.id,
    createdAt: new Date().toLocaleString(),
    details: "user created",
  };
  setState("userList", newUser);
  setState("history", newHistory);

  updateUserTable();
  updateSelectOptions();
};

const handleAddProduct = (e) => {
  e.preventDefault();
  const productName = document.getElementById("product_name").value;
  const productQuantity = parseInt(
    document.getElementById("product_quantity").value
  );
  const productPrice = parseInt(document.getElementById("product_price").value);

  const newProduct = {
    id: Math.round(Math.random() * 1000),
    name: productName,
    quantity: productQuantity,
    price: productPrice,
  };
  setState("productList", newProduct);
  updateProductTable();
};

const handleTransfer = (e) => {
  e.preventDefault();
  const sender = parseInt(document.getElementById("transfer_sender").value);
  const receiver = parseInt(document.getElementById("transfer_receiver").value);
  const amount = parseInt(document.getElementById("transfer_amount").value);
  //make the transfer
  const senderUser = state.userList.find((x) => x.id === sender);
  const receiverUser = state.userList.find((x) => x.id === receiver);

  if (senderUser.balance >= amount) {
    senderUser.balance -= amount;
    receiverUser.balance += amount;
    //create history for the transaction
    const newHistory = {
      id: Math.round(Math.random() * 1000),
      userId: senderUser.id,
      createdAt: new Date().toLocaleString(),
      details: `user send $ ${amount} to the user with id ${receiverUser.id}`,
    };
    const newHistory2 = {
      id: Math.round(Math.random() * 1000),
      userId: receiverUser.id,
      createdAt: new Date().toLocaleString(),
      details: `user received $ ${amount} from the user with id ${senderUser.id}`,
    };
    setState("history", newHistory);
    setState("history", newHistory2);
  } else {
    alert(
      "You cannot make the transfer, the user doesn't have enough balance to make this transfer."
    );
  }
  updateUserTable();
  updateSelectOptions();
};

const handleSell = (e) => {
  e.preventDefault();
  const senderId = parseInt(document.getElementById("sales_sender").value);
  const receiverId = parseInt(document.getElementById("sales_receiver").value);
  const productId = parseInt(document.getElementById("sales_product").value);
  //make the product sell
  const senderUser = state.userList.find((x) => x.id === senderId);
  const receiverUser = state.userList.find((x) => x.id === receiverId);
  const soldProduct = senderUser.products.find((x) => x.id === productId);

  if (receiverUser.balance > soldProduct.price) {
    senderUser.balance += amount;
    receiverUser.balance -= amount;
    soldProduct.quantity -= 1;
    const receivedProduct = receiverUser.products.find(
      (x) => x.id === productId
    );
    if (receivedProduct) {
      receivedProduct.quantity += 1;
    } else {
      receiverUser.products = [
        ...receiverUser.products,
        { ...soldProduct, quantity: 1 },
      ];
    }
    const newHistory = {
      id: Math.round(Math.random() * 1000),
      userId: senderUser.id,
      createdAt: new Date().toLocaleString(),
      details: `user sold ${soldProduct.name} to the user with id ${receiverUser.id}`,
    };
    const newHistory2 = {
      id: Math.round(Math.random() * 1000),
      userId: receiverUser.id,
      createdAt: new Date().toLocaleString(),
      details: `user purchased ${soldProduct.name} from the user with id ${senderUser.id}`,
    };
    setState("history", newHistory);
    setState("history", newHistory2);
  } else {
    alert(
      "You cannot make the transfer, the user doesn't have enough balance to make this purchase."
    );
  }

  updateUserTable();
  updateSelectOptions();
};

contactForm.innerHTML = UserProductFormContent(
  contactForm,
  "Add Contact",
  "bi bi-person-plus-fill",
  contactFormTemplate,
  handleAddUser
);
productForm.innerHTML = UserProductFormContent(
  productForm,
  "Add Product",
  "bi bi-boxes",
  productFormTemplate,
  handleAddProduct
);
transferForm.innerHTML = TrasferSalesFormContent(
  transferForm,
  transferFormTemplate,
  handleTransfer
);
salesForm.innerHTML = TrasferSalesFormContent(
  salesForm,
  salesFormTemplate,
  handleSell
);
transactionHistoryBtn.addEventListener("click", listTransactionHistory);
productHistoryBtn.addEventListener("click", listProducts);
sellProductBtn.addEventListener("click", sellProduct);

document.addEventListener("click", function (e) {
  if (!e.path.find((x) => x.className?.includes("bottom-section"))) {
    state.currentUser = "";
    state.currentProduct = "";
    document.querySelector(".active-row")?.classList.remove("active-row");
  }
});
// const App = () => {

// };

// (function () {
//   document.getElementById("root").innerHTML = App();
// })();
