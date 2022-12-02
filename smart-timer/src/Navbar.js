import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = (props) => {
	
	const onSignoutClick = ()=>{		
		try{
			props.onSignout();
			
		} catch(e){
			console.log(e);
		}
	}

	// useEffect(()=>{
	// 	console.log("User state changed");
	// 	console.log(props.userState);
	// },[props.userState]);

	return (
		<>
		<Nav>
			<NavMenu>
			<NavLink to="/timer" activeStyle>
				Timer 
				{/* {props.userState.isSigned.toString()} */}
			</NavLink>
			
			{(props.userState.isSigned==false)?(
			<NavLink to="/login" activeStyle>
				Sign In
			</NavLink>):(<><NavLink to="/workchart" activeStyle>
				Work Chart
			</NavLink><NavLink to="/" onClick={props.onSignout} activeStyle>
				Sign Out
			</NavLink></>)}

			</NavMenu>
		</Nav>
		</>
	);
};

export default Navbar;
