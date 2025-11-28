# 🛍️ MyShop — LocalStorage-Based E-Commerce Website

A clean, responsive mini e-commerce website built using **HTML, CSS, JavaScript, Bootstrap 5**, and **LocalStorage** for storing user data, products, cart items, and admin controls.

This project demonstrates essential e-commerce functionalities **without any backend**, making it perfect for learning, demos, and frontend practice.

---

## 🚀 Features

### 👤 **Authentication**

* User Registration
* User Login / Logout
* Admin Login (default: `admin@gmail.com` / `admin123`)
* Dynamic navbar based on login role
* Remember logged-in user in LocalStorage

---

### 🛒 **Shopping Features**

* Browse products from multiple categories
* Add items to Cart
* View Cart with quantity, totals & grand total
* Remove items
* Checkout (clears cart and shows confirmation)

---

### 🛠️ **Admin Panel**

Admin can:

* Add new products
* View products instantly on Shop page
* Only Admin sees “Add Product” menu

Products are stored in `localStorage` and auto-loaded if empty.

---

## 🧩 Tech Stack

| Technology               | Usage                      |
| ------------------------ | -------------------------- |
| **HTML5**                | Structure                  |
| **CSS3**                 | Styling, animations, UI    |
| **Bootstrap 5**          | Layout + responsiveness    |
| **Material Icons**       | Icons                      |
| **JavaScript (Vanilla)** | App logic, LocalStorage    |
| **LocalStorage**         | Save Users, Products, Cart |
| **No Backend**           | Pure frontend project      |

---

## 📂 Folder Structure

```
MyShop/
│── index.html
│── shop.html
│── cart.html
│── login.html
│── register.html
│── add-product.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js
│   ├── main.js
│   ├── products.js
│   └── cart.js
│
└── assets/ (optional for images)
```

---

## 🔧 Setup & Usage

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

### 2️⃣ Open the project

```
cd MyShop
```

### 3️⃣ Run locally

Just open **index.html** in your browser — no server required.

Or run using VS Code Live Server:

```
Right click → "Open with Live Server"
```

---

## 🔑 Default Admin Login

| Email                                         | Password     |
| --------------------------------------------- | ------------ |
| **[admin@gmail.com](mailto:admin@gmail.com)** | **admin123** |

Admin sees:
✔ Add Product page
✔ Admin-Only options in navbar

Users only see:
✔ Shop
✔ Cart

---

## 🛍️ Sample Products

If `localStorage` is empty, the app auto-loads sample items:

* Electronics
* Clothing
* Home & Living

You can add unlimited products via Admin.

---

## 🖼️ Screenshots

(Add your own screenshots in the repo and link them here)

```
![Home Page](assets/screens/home.png)
![Shop Page](assets/screens/shop.png)
![Cart Page](assets/screens/cart.png)
![Admin Add Product](assets/screens/add-product.png)
```

---

## ⚙️ How It Works (Behind the Scenes)

### ✔ LocalStorage Keys Used:

| Key            | Purpose                     |
| -------------- | --------------------------- |
| `users`        | Stores all registered users |
| `loggedInUser` | Stores current user         |
| `products`     | Stores all store products   |
| `cart`         | Cart items for each user    |

Everything persists until you manually clear browser storage.

---

## 🤝 Contributing

Feel free to fork the project and improve:

* Add payment flow
* Add product search
* Add categories filter
* Move to a real backend (Node / Django / Flask)

---

## ⭐ If you like this project

Consider giving the repo a **Star ⭐** on GitHub!
