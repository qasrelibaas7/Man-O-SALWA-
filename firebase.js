// ================= FIREBASE CONFIG =================
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ================= ADMIN LOGIN =================
function adminLogin(email, password) {
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        alert("Login Successful");
        // Redirect to admin dashboard or show dashboard section
        document.getElementById('admin-section').style.display = 'block';
    })
    .catch(error => {
        alert("Login Failed: " + error.message);
    });
}

// ================= ADD ORDER TO FIRESTORE =================
function saveOrder(orderData) {
    db.collection("orders").add(orderData)
    .then(() => {
        alert("Order Saved Successfully");
    })
    .catch(error => {
        console.error("Error saving order: ", error);
    });
}

// ================= FETCH ORDERS FOR DASHBOARD =================
function fetchOrders(callback) {
    db.collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
          let orders = [];
          snapshot.forEach(doc => orders.push({id: doc.id, ...doc.data()}));
          callback(orders);
      });
}