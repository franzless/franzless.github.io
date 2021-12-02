const overlay = document.querySelector('.navigation__mobile--overlay');
const pages = [{id:"home", class:".navigation__a--home" },{ id: "destination", class: ".navigation__a--destination" },
{ id: "crew", class: ".navigation__a--crew" }, { id: "technology", class: ".navigation__a--technology" }];

var tech_selectedImg = "Launch vehicle";

window.addEventListener("resize", function () {
  const link = window.location.href;
  if (link.indexOf('technology') > -1) {    
    this.loadTech(this.tech_selectedImg); 
  } 
  
});

function pageLoaded (page, planet) {  
  this.setRoute(page);
  this.loadDestination(planet);
}
function pageLoadedCrew (page, crew) {  
  this.setRoute(page);
  this.loadCrew(crew);
}
function pageLoadedTech (page, tech) {  
  this.setRoute(page);
  this.loadTech(tech);
}

function setRoute(id) {
  let page = pages.find(page => page.id === id);  
  let classStyle = document.querySelectorAll(page.class);
  classStyle.forEach(c => {
    c.style["border-bottom"] = "2px solid white";  
  })  
};

function loadTechImg () {
  var breite = document.body.clientWidth;
  if (breite > 1200) {
    return "portrait"
  } else {
    return "landscape"
  }
};

function closeOverlay() {  
  overlay.style.display = "none";
};
function openOverlay() {  
  overlay.style.display = "flex";
};
function loadDestination(dest) {
  // GET JSON DATA  
  fetch("./data.json").then(res => {
    return res.json();
  }).then(jsondata => {
    var data = jsondata;
  
  // Clear Border of List Items
    var clearBorder = document.querySelectorAll(".destinationList > li");
    clearBorder.forEach(border => {
      border.style.border = "none";
    })
    // Set Border of selected Item
    document.querySelector(`#li__${dest}`).style["border-bottom"] = "2px solid white";
    // GET PLANET DATA
    let planetData = data.destinations.find(destinations => destinations.name === dest );
    // SET DATA TO DOM
    document.querySelector(".img__planet").src = planetData.images.png;   
    document.querySelector("#destination__planet").textContent = planetData.name;
    document.querySelector("#destination__planetText").textContent = planetData.description;
    document.querySelector("#destination__distance").textContent = planetData.distance;
    document.querySelector("#destination__travelTime").textContent = planetData.travel;
  
  })
};
function loadCrew(crewRole) {
  // GET JSON DATA  
  fetch("./data.json").then(res => {
    return res.json();
  }).then(jsondata => {
    var data = jsondata;
    console.log(data)  
  // Clear selected List Items
    var clearList = document.querySelectorAll(".crewList > li");
    clearList.forEach(item => {
      item.style["background-color"] = "#979797";
    })
    // Set Border of selected Item
    let refactorRoletoID = crewRole.split(' ').join('_');     
    console.log(refactorRoletoID);    
    document.querySelector(`#${refactorRoletoID}`).style["background-color"] = "#FFFFFF";
    
    // GET PLANET DATA
    let crewData = data.crew.find(crew => crew.role === crewRole );    
    // SET DATA TO DOM
    document.querySelector(".crew__image").src = crewData.images.png;   
    document.querySelector(".crew__jobname").textContent = crewData.role;
    document.querySelector(".crew__name").textContent = crewData.name;
    document.querySelector(".crew__description").textContent = crewData.bio;  
  })
};

function loadTech(tech) {
  // GET JSON DATA
  this.tech_selectedImg = tech;  
  fetch("./data.json").then(res => {
    return res.json();
  }).then(jsondata => {
    var data = jsondata;     
  // Clear selected List Items
    var clearList = document.querySelectorAll(".techList > li");
    clearList.forEach(item => {
      item.style["background-color"] = "#0B0D17";
      item.style.color = "#FFFFFF";
    })
    // Set Border of selected Item
    let refactorRoletoID = tech.split(' ').join('_');     
       
    document.querySelector(`#${refactorRoletoID}`).style["background-color"] = "#FFFFFF";
    document.querySelector(`#${refactorRoletoID}`).style.color = "#0B0D17";
    // GET PLANET DATA
    let techData = data.technology.find(technology => technology.name === tech );
       
    // SET DATA TO DOM
    let imgType = loadTechImg();
    console.log(imgType);
    document.querySelector(".tech__image").src = techData.images[imgType];   
    document.querySelector(".tech__object").textContent = techData.name;
    document.querySelector(".tech__description").textContent = techData.description;
      
  })
};


