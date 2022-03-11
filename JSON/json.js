


//récupération donné json par Fetch API
fetch('./us.json')
    .then (response => response.json())
    .then(function(data){
        console.log(data);
        var {groupe,member}= data;
        var titre =`
        <h2>${groupe}</h2>`;
        document.querySelector("#top-banner").innerHTML= titre; 
        
        
        for(var i=0; i < member.length; i++){
            var {name,age,couleur,passions}=member[i];
            var myPassion='';
            for(var j=0;j<passions.length;j++){
                 myPassion += `<li class="passionList">${passions[j]}</li>`;
                //console.log(myPassion);
            }
            
            var markup = `
            <section>
                <h3 id="member">${name}</h3>
                <p>Âge: ${age} ans </p>
                <p>Couleur favorite: ${couleur} </p>
                <p>Passions :</p>
                <ul>${myPassion}</ul>
            </section>`;
            console.log(`${name}`);
            //thanks my queen for the + <3
            document.querySelector("#info").innerHTML += markup;
            }
        
       
    })

