//Main API implemented here
const loadPhones = async(searchText="oppo",isloadMore) => {
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones=data.data
    displayPhones(phones,isloadMore)
}

//display All pjhones from API
function displayPhones(phones,isloadMore){

    const phoneListContainer = document.getElementById("phone-list-container");
    phoneListContainer.innerHTML = "";
    const loadMoreContainer= document.getElementById("load-more-container");

    // load More button visibility control
    if( phones.length > 12 && !isloadMore){
    loadMoreContainer.classList.remove("hidden");
    }else{
          loadMoreContainer.classList.add("hidden");
    }
    //Showing only 12 phones
    if(!isloadMore){     
        phones =  phones.slice(0,12)
    }
    // Displaying phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.innerHTML = 
        `
        <div class="card bg-base-100 shadow-xl p-4">
                    <figure class=" m-6 px-5 py-10 bg-[#0D6EFD0D]">
                      <img src="${phone.image}" alt="phone" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title font-bold	">${phone.phone_name}</h2>
                      <p class="	font-normal text-base text-[#706F6F]">There are many variations of <br> passages of available, but the<br>  majority have suffered</p>
                      <p class="text-2xl font-bold">$999</p>
                      <div class="card-actions">
                        <button id="${phone.slug}" onclick="showDetails('${phone.slug}')" class="btn btn-primary font-bold text-white">Show Details</button>
                      </div>
                    </div>
                  </div>
        `
        phoneListContainer.appendChild(phoneDiv);
    });
      //// hide loading spinner after getting data
      toggleSpinner(false);

        // spinner visibility on no data
      if(phones.length===0){
        toggleSpinner(true);
    }
  }

  //Taking Input from search box
function handleSearch(isloadMore){
    toggleSpinner(true);
    const searchBox = document.getElementById("search-box");
    searchBoxValue = searchBox.value;
    loadPhones(searchBoxValue,isloadMore);
  
  
}

//Spinner Toggle function
function toggleSpinner(isTrue){
  const Spinner = document.getElementById("spinner");
    if(isTrue){
        Spinner.classList.remove("hidden");
        
    }
    else{
        Spinner.classList.add("hidden");
    }
}

// handle show Details in Modal
const showDetails = async(id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
   const phone=data.data
  showPhoneModal(phone)
}


// Modal Details
const showPhoneModal = (phone) => {
  console.log(phone);

  const showPhoneModal = document.getElementById('showPhoneModal');
//modal desing & structure
  showPhoneModal.innerHTML = `
                    <div class=" p-6 mb-6 rounded-lg bg-[#0D6EFD0D] w-auto max-h-96	 flex justify-center items-center">
                      <img src="${phone.image}" alt="phone" width: "268px";
                      height: "381px"/>
                    </div>
                    <div class="">
                      <h2 class="font-bold text-2xl">${phone.name}</h2>
                      <p class="font-normal text-base text-[#706F6F]">Best Phone of Choice</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold" >Storage :</span> ${phone?.mainFeatures?.storage || 'No Storage info available'}</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold" >Display Size :</span> ${phone?.mainFeatures?.displaySize || 'No Display Size info available'}</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold" >Chipset :</span> ${phone?.mainFeatures?.chipSet || 'No Chipset info available'}</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold" >Memory :</span> ${phone?.mainFeatures?.memory  || 'No Memory info available'}</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold" >Release data :</span> ${phone?.releaseDate || 'No Release data available'}</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold" >Brand  :</span> ${phone?.brand}</p>
                      <p class="font-normal text-base text-[#706F6F]"><span class="text-[#403F3F] font-semibold">GPS :</span> ${phone.others?.GPS || 'No GPS available'}</p>

                    </div>

  `


  // // show the modal
  phone_details_modal.showModal();
}

// Load More button
const loadMore =() =>{
  handleSearch(true);  
}
loadPhones()