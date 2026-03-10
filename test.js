const UserDetails = JSON.parse(localStorage.getItem("UserDetails"))
const groups = UserDetails["groups"]
if(groups.includes("/DarkEye-Super-User")){
  show = true;
}
else{
  show = false;
};

