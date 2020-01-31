var myDB=[
    {Name:"John Snow",Email:"JohnSnow@email.com",Age:29},
    {Name:"Darth Vader",Email:"DarthVader@email.com",Age:50},
    {Name:"Sheldon Cooper",Email:"SheldonCooper@email.com",Age:37}
];

//Generate Default cards and New Users 
(function Avatars(db){

    var init=function(){

        generateList();
        enterUser();
    }

    var generateList=function(){
        var parent=document.querySelector("#parent_avatars");
        
        var template='';

        for(var i=0;i<db.length;i++){

            template+='<div class="col-sm-4">';
            template+='<div class="card">';
            template+='<div class="card-delete" data-card="'+i+'">';
            template+= 'X';
            template+= '</div>';
            template+='<div class="card-block">';
            template+='<h3 class="card-title">' +db[i].Name+ '</h3>';
            template+='<p class="card-text"><strong>Email</strong>: <span>' +db[i].Email+ '</span></p>';
            template+='<p class="card-text"><strong>Age</strong>: <span>' +db[i].Age+ '</span></p>';
            template+='</div>';
            template+= '</div>';
            template+='</div>';
        }
        parent.innerHTML="";    
        parent.insertAdjacentHTML("afterbegin",template);
        deleteCard();
        
    };

    var enterUser=function(){
        
        function createUser(){

            var name=document.querySelector("#user_name").value;
            var email=document.querySelector("#user_email").value;
            var age=document.querySelector("#user_age").value;

            var elements=[name,email,age];

            if(ValidateUser(elements))
            {   document.querySelector("#myForm").reset();
               var newUser={Name:name,Email:email,Age:age};
               db.unshift(newUser);
               generateList();
            }

            else{
              document.querySelector("#error").style.display="block";
              setTimeout(function(){
                document.querySelector("#error").style.display="none";
              },2000)
            }

        }

        document.querySelector("#myForm").addEventListener("submit",function(e){

            e.preventDefault();
            
            createUser();
        })

       
    };

    var ValidateUser=function(elements){
        var valid=true;
        for(var i=0;i<elements.length;i++)
        {
            if(elements[i]=="")
            {   
                valid=false;
                return valid;

            }


        }

       return valid;
    }

    var deleteCard=function(){
        var buttons=document.querySelectorAll(".card-delete");

        function deleteThis(element){
            var dataCard=parseInt(element.getAttribute("data-card"));
            db.splice(dataCard,1);
            generateList();
        };

        for(var i=0;i<buttons.length;i++)
        {
            buttons[i].addEventListener("click",function(){
                deleteThis(this);
            })
        }
    };

    init();

})(myDB)