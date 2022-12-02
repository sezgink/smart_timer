export async function onSignout(setUserState,navigateHome){

    const logoutEndpoint = "http://localhost:9443/user/logout/"
    
    const fetchOptions = {
      
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') 
      },
      method: "POST"
      
      }
      //   setSubmitting(true);
      // console.log(JSON.stringify(values, null, 2));
      try {
      await fetch(logoutEndpoint,fetchOptions);

      setUserState({isSigned:false});
      localStorage.setItem("token","");
      localStorage.setItem("user","");
      navigateHome();
      } catch(e){
        console.log(e);
      }
  }

export const checkSignIn = (setUserState)=>{
  const localUser = localStorage.getItem("user");
  if(localUser!==""){
      const userData = JSON.parse(localUser);
      setUserState({isSigned:true,user:{ _id:localUser._id, email:localUser.email},token:localStorage.getItem("token")});
    }
}

