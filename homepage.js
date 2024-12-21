import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"
import { getDatabase, ref, set, onChildAdded, remove, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrSqLx03G6hZI-XNKMKkTA_bKmFNhwgpQ",
    authDomain: "pt-101chatapp.firebaseapp.com",
    databaseURL: "https://pt-101chatapp-default-rtdb.firebaseio.com",
    projectId: "pt-101chatapp",
    storageBucket: "pt-101chatapp.appspot.com",
    messagingSenderId: "224702149854",
    appId: "1:224702149854:web:5de20b4f86b02ec3493e4f",
    measurementId: "G-0WB3VNLBWX"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const db=getFirestore();
  const realTimeDb = getDatabase(app);

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })
   // Check authentication state
   onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = user.uid; // Use Firebase user ID
        localStorage.setItem('loggedInUserId', loggedInUserId); // Store user ID in local storage

        // Fetch user data from Firestore
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserEmail').innerText = userData.email;
            } else {
                console.log("No document found matching ID");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        // Load messages from Firebase
        loadMessages();

    } else {
        console.log("No user is signed in");
        window.location.href = 'index.html'; // Redirect to login page if not authenticated
    }
});

// Function to load messages
function loadMessages() {
    onChildAdded(ref(realTimeDb, "messages"), (data) => {
        const msg = data.val();
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("outer");
        msgDiv.id = data.key;

        const timestamp = new Date(parseInt(data.key)).toLocaleTimeString(); // Convert timestamp to readable format
        const timestampDiv = document.createElement("span");
        timestampDiv.className = "timestamp";
        timestampDiv.innerText = timestamp;

        const messageContent = document.createElement("div");
        messageContent.className = "messageContent " + (msg.sender === auth.currentUser.email ? "me" : "notMe");
        messageContent.innerText = msg.sender === auth.currentUser.email ? `you: ${msg.msg}` : `${msg.sender}: ${msg.msg}`;


        // Create a container for timestamp, message, and button
        const messageContainer = document.createElement("div");
        messageContainer.className = "messageContainer";
        messageContainer.appendChild(messageContent);
        messageContainer.appendChild(timestampDiv); // Add timestamp

        msgDiv.appendChild(messageContainer);
        document.getElementById("messages").appendChild(msgDiv);
    });

}

// Log out functionality
const logoutButton = document.getElementById('logoutBtn');
logoutButton.addEventListener('click', () => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    localStorage.removeItem('loggedInUserId');
    signOut(auth).then(() => {
        console.log("User signed out");
        window.location.href = 'index.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});

// Send message functionality
module.sendMsg = function sendMsg() {
    const msgTxt = document.getElementById('msgTxt');
    const msg = msgTxt.value;
    if (msg.trim() === "") return; // Prevent sending empty messages
    const timestamp = new Date().getTime();
    set(ref(realTimeDb, "messages/" + timestamp), {
        msg: msg,
        sender: auth.currentUser.email // Use the user's email or any identifier
    });

    msgTxt.value = ""; // Clear the input field after sending
};

