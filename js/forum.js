const loadAllPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  displayPost(data.posts);
};

const loadSearch = async (value) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
  );
  const data = await res.json();
  const allPosts = document.getElementById("all-posts");
  allPosts.innerHTML = "";
  displayPost(data.posts);
};

const displayPost = (posts) => {
  const allPosts = document.getElementById("all-posts");

  posts.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.classList = `flex p-4 md:p-10 gap-6 rounded-3xl bg-[#F3F3F5]`;
    div.innerHTML = `
            <div class="relative me-4">
                <img class="w-16 h-16 rounded-xl" src=${
                  post.image
                }" alt="profile image">
                <span class="top-[-7px] end-[-7px] absolute w-4 h-4 ${
                  post.isActive ? "bg-green-500" : "bg-red-500"
                } border-2 border-white  rounded-full"></span>
            </div>

            <div class ="flex-1">
                 <p class="inter text-sm font-medium text-color2 mb-3"><span># ${
                   post.category
                 }</span> <span class="ml-0 md:ml-5 block md:inline">Author: ${post.author.name}</span></p>  
                 <h4 class="text-xl font-bold text-color3 mb-4">${
                   post.title
                 }</h4> 
                 <p class="inter text-base font-normal text-color4">${
                   post.description
                 }</p>  
                 <div class="border-b-2 border-dashed border-[#12132D40] my-5"></div>  
                 <div class="flex justify-between items-center">
                    <div class="flex flex-wrap md:flex-nowrap gap-6">
                        <p class="inter text-base font-normal"><i class="fa-regular fa-comment"></i> <span class=" text-color2">${
                          post.comment_count
                        }</span></p>
                        <p class="inter text-base font-normal text-color2"><i class="fa-regular fa-eye"></i> <span class=" text-color2">${
                          post.view_count
                        }</span></p>
                        <p class="inter text-base font-normal text-color2"><i class="fa-regular fa-clock"></i> <span class=" text-color2">${
                          post.posted_time
                        }</span></p>
                    </div>
                    <div onclick='handleReadPost("${post.title.replace(
                      "'",
                      ""
                    )}","${
      post.view_count
    }"); pushNotify()' class="cursor-pointer py-1 px-2 border rounded-full bg-[#10B981] ">
                        <i class="fa-solid fa-envelope-open text-white"></i>  
                    </div>
                 </div>
            </div>
        
    `;
    allPosts.appendChild(div);
  });
  toggleLoadingSpinner(false);
};

const handleReadPost = (title, view) => {
  //   console.log(title, view);
  const updateMarkedValue = document.getElementById("update-marked-value");
  updateMarkedValue.innerText = parseInt(updateMarkedValue.innerText) + 1;
  const markedPost = document.getElementById("marked-post");
  const div = document.createElement("div");
  div.classList = `flex justify-between gap-2 bg-white p-4 rounded-2xl`;
  div.innerHTML = `
    <h4 class='text-base font-semibold text-color3'>${title}</h4>
    <p class="inter text-base font-normal text-color2 flex items-center gap-2"><i class="fa-regular fa-eye"></i> <span class="text-color2">${view}</span></p>
  `;
  markedPost.appendChild(div);
};

const searchPost = document
  .getElementById("search-post")
  .addEventListener("click", () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("default-search");
    const searchText = searchField.value;
    loadSearch(searchText);
    searchField.value = "";
  });

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// Toast
let myNotify;
function pushNotify() {
  myNotify = new Notify({
    status: "success",
    title: "Successfully Marked",
    effect: "slide",
    type: "filled",
  });
}
function close() {
  myNotify.close();
}

loadAllPosts();
