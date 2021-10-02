const rootDiv = document.createElement('div')
rootDiv.setAttribute('id',"root")
rootDiv.innerHTML=`<div class="spinner-container d-flex justify-content-center align-items-center">
<div class="spinner-border text-danger" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
document.body.append(rootDiv);

const root = document.getElementById('root');
async function getGithubData(){
    try{
        const data = await fetch('https://api.github.com/users/kumarrahul1998/repos')
        var finalData = await data.json();
        console.log(finalData);
        root.innerHTML=`<div class="container-fluid">
        <div class="row" >
            <div class="col-md-5 col-sm-12 standard-container d-flex justify-content-center align-items-center flex-column" >
                <p class="task-title">Github API Task</p>
                <img src="${finalData[0].owner.avatar_url}" class="profile-image" alt="profile image">
                <p class="name"><span class="name-container">${finalData[0].owner.login}</span></p>
            </div>
            <div class="col-md-7 col-sm-12 standard-container p-2">
              <div class="accordion" id="repoAccordion">
                  
              </div>
            </div>
        </div>
    </div>`;
    const repoAccordion= document.getElementById('repoAccordion');
    for(let i of finalData){
        repoAccordion.innerHTML+= ` <div class="accordion-item">
        <h2 class="accordion-header" id="heading${i.id}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i.id}" aria-expanded="true" aria-controls="collapseOne">
           <span class="repo-name">${i.name} <span class="badge bg-primary">${i.visibility}</span></h1></span>
          </button>
        </h2>
        <div id="collapse${i.id}" class="accordion-collapse collapse" aria-labelledby="heading${i.id}" data-bs-parent="#repoAccordion">
          <div class="accordion-body">
            <p class="repo-link">Repo Link: <a href="${i.url}">${i.url}</a></p>
            <p class="fork-count"><i class="fas fa-utensils"></i> ${i.forks_count}</p>
            <p class="stars-count"><i class="fas fa-star"></i> ${i.watchers_count} </p>
        </div>
        </div>
      </div>`
    }
    }
    catch(err){
        alert("Some error happened")
    }

}

setTimeout(()=>{
    getGithubData();
},2000)