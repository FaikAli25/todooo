// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import {getFirestore,collection,getDocs,addDoc,deleteDoc,doc,query,where,serverTimestamp} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"
  const firebaseConfig = {
    apiKey: "AIzaSyB-4I2Vskal25RcGZYv-oT6eXvVl5HQ4PQ",
    authDomain: "bookmark-8fe98.firebaseapp.com",
    projectId: "bookmark-8fe98",
    storageBucket: "bookmark-8fe98.firebasestorage.app",
    messagingSenderId: "755309479825",
    appId: "1:755309479825:web:b3f51fad6392e6e1ebbc30"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const colref = collection(db,"bookmarks");
function deleteevent(){
  const deletebutton=document.querySelectorAll("i.delete"); 
  console.log(deletebutton);
  deletebutton.forEach(button=>{
        button.addEventListener("click",event=>{
            const deleteref=doc(db,"bookmarks",button.dataset.id);
            deleteDoc(deleteref)
            .then(()=>{
                button.parentElement.parentElement.parentElement.remove();
            })
        })
  })
}


function generateTemplate(data,id){
    return `<div class="card">
    <p class="title">${data.title}</p>
    <div class="sub-information">
        <p > 
            <span class="catagory" ${data.catagory}> ${data.catagory[0].toUpperCase()+data.catagory.slice(1)}</span>
        </p>
    <a href="${data.link}" target="_blank"><i class="bi bi-box-arrow-up-right website"></i></a>
    <a href="https://www.google.com/search?q=${data.title}" target="_blank"><i class="bi bi-google search"></i></a>
    <span ><i class="bi bi-trash delete" data-id="${id}"></i></span>
    </div>
</div> 
`
} 

  const cards=document.querySelector(".cards");
  function showcard(){
    cards.innerHTML="";
  getDocs(colref)
  .then((data)=>{
      data.docs.forEach(document => {
        // console.log(document.data(),document.id);
        cards.innerHTML+=generateTemplate(document.data(),document.id);
               
      });
     deleteevent();

  }).catch(err=>console.log(err))   
}
showcard();



const addform=document.querySelector(".add");
  addform.addEventListener("submit",event=>{
   event.preventDefault();
   addDoc(colref,{
    title:addform.title.value,
    link:addform.link.value,
    catagory:addform.catagory.value,
    createdAt:serverTimestamp()
   })
   .then(()=>{
    addform.reset()
    showcard(); 
   })
  })

// /*******  78d58087-b597-4089-8b15-6f8f66c8fa86  *******/
function filtercards(catagory){

    if( catagory=="all" ){
        showcard();
    }else{
     const qRef=query(colref,where("catagory","==",catagory));
            cards.innerHTML="";
            getDocs(qRef)
            .then((data)=>{
      data.docs.forEach(document => {
        // console.log(document.data(),document.id);
        cards.innerHTML+=generateTemplate(document.data(),document.id);
               
      });
     deleteevent();

  }).catch(err=>console.log(err))   
}
}





  const catagorylist=document.querySelector(".catagory-list");
  const catagorylistspan=catagorylist.querySelectorAll(".catagory-list span");
  catagorylist.addEventListener("click",event=>{
        if (event.target.tagName=="SPAN") {

            filtercards(event.target.innerText);
            // console.log(event.target.innerText);
            catagorylistspan.forEach(span=>span.classList.remove("active"));
            event.target.classList.add("active");
        }
  })
  