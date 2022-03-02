import { useNavigate } from "react-router-dom";
import {
  InputBase,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import StorefrontIcon from "@material-ui/icons/Storefront";

import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/actions/productsActions";
import {
  setCurrentUser,
  setLoginStatus,
} from "../../redux/actions/authActions";

import SearchBar from "material-ui-search-bar";

import PersonTwoToneIcon from "@material-ui/icons/PersonTwoTone";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const headersData = [
  {
    id: 1,
    label: "Products",
    href: "/",
  },
  {
    id: 2,
    label: (
      <span>
        <HomeIcon />
        Home
      </span>
    ),
    href: "/home",
  },
  {
    id: 3,
    label: (
      <span>
        <ShoppingCartIcon />
        Cart
      </span>
    ),
    href: "/cart",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  // serach text
  const onChangeSearchText = (evt) => {
    dispatch(setSearchText(evt.target.value));
  };
  // check for ui
  /*
   <Menu.Item>
     <div className="ui category search">
       <div className="ui icon input">
         <input
           onChange={(evt) => onChangeSearchText(evt)}
           className="prompt"
           type="text"
           placeholder="Search categories..."
         />
         <i className="search icon"></i>
       </div>
       <div className="results"></div>
     </div>
   </Menu.Item>;
   */

  // redux
  // read
  const myShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );
  const [cartItemCount, setCartItemCount] = useState(0);

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  // auth reducer
  // after login
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { mobileView, drawerOpen } = state;

  // when user refresh page, redux store will gets reset
  // so check in browser local storage for currentUser object
  // this will fire another useEffect() depending on [currentUser]
  // and updates menu as per user's role
  useEffect(() => {
    let currentUserFromStorage = JSON.parse(
      localStorage.getItem("currentUser")
    );
    if (
      currentUserFromStorage !== undefined &&
      currentUserFromStorage !== null
    ) {
      if (currentUserFromStorage.role === "Admin") {
        console.log("local-storage-Admin");
        navigate("/");
      } else if (currentUserFromStorage.role === "Shopper") {
        console.log("local-storage-Shopper");
        navigate("/");
      }
      dispatch(setCurrentUser(currentUserFromStorage));
    } else {
      console.log("Not Logged In Yet!");
    }

    const setResponsiveness = () => {
      return window.innerWidth < 1100
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    // very first time, when window resize, memory leack error @ console
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  // updates when shopper does shopping
  useEffect(() => {
    if (
      myShoppingCart !== undefined &&
      myShoppingCart !== null &&
      myShoppingCart.length > 0
    ) {
      console.log("CART IS NOT EMPTY!!! ,,,running init function @ header!!");

      let totalCartItemCount = 0;
      myShoppingCart.forEach(function (item) {
        totalCartItemCount += item.qty;
      });

      // setCartItemCount(myShoppingCart.length);
      setCartItemCount(totalCartItemCount);
    } else {
      console.log("CART IS EMPTY!!! ,,,running init function @ header!!");
      setCartItemCount(0);
    }

    const setResponsiveness = () => {
      return window.innerWidth < 1100
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    // very first time, when window resize, memory leack error @ console
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, [myShoppingCart]);

  // updates when user login
  useEffect(() => {
    if (currentUser !== undefined && currentUser !== null) {
      if (currentUser.role === "Admin") {
        console.log("Admin");
        navigate("/");
      } else if (currentUser.role === "Shopper") {
        console.log("Shopper");
        navigate("/");
      }
    } else {
      console.log("Not Logged In Yet!");
    }

    const setResponsiveness = () => {
      return window.innerWidth < 1100
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    // very first time, when window resize, memory leack error @ console
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, [currentUser]);

  /*
    <Toolbar className={classes.toolbar}>
        {webStoreLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
  */
  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {webStoreLogo}
        {currentUser.role === "Admin" ? (
          <div>{getMenuButtonsForAdmin()}</div>
        ) : (
          <span>
            {currentUser.role === "Shopper" ? (
              <div>{getMenuButtonsForShopper()}</div>
            ) : (
              <div>{getMenuButtons()}</div>
            )}
          </span>
        )}
      </Toolbar>
    );
  };

  // mobile
  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawerContainer}>
            {
              <span>
                {currentUser.role === "Admin" ? (
                  <span>{getMenuButtonsForAdminMobile()}</span>
                ) : (
                  <span>
                    {currentUser.role === "Shopper" ? (
                      <span>{getMenuButtonsForShopperMobile()}</span>
                    ) : (
                      <span>{getMenuButtonsMobile()}</span>
                    )}
                  </span>
                )}
              </span>
            }
          </div>

          {/*
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
          */}
        </Drawer>

        <div>{webStoreLogo}</div>
      </Toolbar>
    );
  };

  // mobile
  // menu option when user is not login [mobile]
  const getMenuButtonsMobile = () => {
    return (
      <>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <MenuItem>
            <HomeIcon /> Home
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Login")}
        >
          <MenuItem>
            <PersonTwoToneIcon /> Login
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Register")}
        >
          <MenuItem>
            <VpnKeyIcon /> Register
          </MenuItem>
        </Link>
      </>
    );
  };

  // mobile
  // menu option when user as shopper [mobile]
  const getMenuButtonsForShopperMobile = () => {
    return (
      <>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <MenuItem>
            <HomeIcon /> Home
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Products")}
        >
          <MenuItem>
            <StorefrontIcon /> Products
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Cart")}
        >
          <MenuItem>
            <Badge
              // className={classes.margin}
              badgeContent={cartItemCount}
              max={999}
              color="primary"
            >
              <ShoppingCartIcon />
              Cart
            </Badge>
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => logOut(e)}
        >
          <MenuItem>
            <ExitToAppIcon /> Logout
          </MenuItem>
        </Link>
      </>
    );
  };

  // mobile
  // menu option when user as admin [mobile]
  const getMenuButtonsForAdminMobile = () => {
    return (
      <>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <MenuItem>
            <HomeIcon /> Home
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Admin")}
        >
          <MenuItem>
            <SupervisorAccountTwoToneIcon /> Admin
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => logOut(e)}
        >
          <MenuItem>
            <ExitToAppIcon /> Logout
          </MenuItem>
        </Link>
      </>
    );
  };

  // mobile
  /*
  const getDrawerChoices = () => {
    return headersData.map(({ label, href, id }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: id,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };
  */
  const getDrawerChoices = () => {
    return (
      <>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Products")}
        >
          <MenuItem>
            <StorefrontIcon />
            Products
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Cart")}
        >
          <MenuItem>
            <Badge
              className={classes.margin}
              badgeContent={cartItemCount}
              max={999}
              color="primary"
            >
              <ShoppingCartIcon />
              Cart
            </Badge>
          </MenuItem>
        </Link>
        <Link
          className={classes.linkStyle}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <MenuItem>
            <HomeIcon /> Home
          </MenuItem>
        </Link>
      </>
    );
  };

  const webStoreLogo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Web-Store
    </Typography>
  );

  // menu option when user as admin
  const getMenuButtonsForAdmin = () => {
    return (
      <>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <HomeIcon /> Home
        </Button>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Admin")}
        >
          <SupervisorAccountTwoToneIcon /> Admin
        </Button>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => logOut(e)}
        >
          <span>
            {currentUser.userName && <span>[{currentUser.userName}]</span>}
            &nbsp;&nbsp;
            <ExitToAppIcon className={classes.logoutSymbol} />
            <br />
            <span className={classes.adminSpan}>Admin</span>
          </span>
        </Button>
      </>
    );
  };

  // menu option when user as shopper
  const getMenuButtonsForShopper = () => {
    return (
      <>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <HomeIcon /> Home
        </Button>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Products")}
        >
          <StorefrontIcon /> Products
        </Button>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Cart")}
        >
          <Badge
            className={classes.margin}
            badgeContent={cartItemCount}
            max={999}
            color="primary"
          >
            <ShoppingCartIcon /> Cart
          </Badge>
        </Button>

        <span className={classes.searchSymbol}>
          <SearchIcon />
        </span>
        <input
          className={classes.searchText}
          onChange={(evt) => onChangeSearchText(evt)}
          type="text"
          placeholder="Search categories..."
        />

        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => logOut(e)}
        >
          <span>
            {currentUser.userName && <span>[{currentUser.userName}]</span>}
            &nbsp;&nbsp;
            <ExitToAppIcon className={classes.logoutSymbol} />
            <br />
            <span className={classes.shopperSpan}>Shopper</span>
          </span>
        </Button>
      </>
    );
  };

  // menu option when user is not login
  /*
  const getMenuButtons = () => {
    return headersData.map(({ label, href, id }) => {
      return (
        <Button
          {...{
            key: id,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  */
  const getMenuButtons = () => {
    return (
      <>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <HomeIcon /> Home
        </Button>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Login")}
        >
          <PersonTwoToneIcon /> Login
        </Button>
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Register")}
        >
          <VpnKeyIcon /> Register
        </Button>
      </>
    );
  };

  const doComponentRedirect = (e, routePath) => {
    console.log("redirect from header menu option", currentUser);
    if (routePath === "Home") navigate("/home");
    if (routePath === "Admin") navigate("/adminProductSales");
    if (routePath === "Products") navigate("/");
    if (routePath === "Cart") navigate("/cart");
    if (routePath === "Login") navigate("/login");
    if (routePath === "Register") navigate("/register");
  };

  // when user log out
  const logOut = () => {
    localStorage.removeItem("currentUser");
    dispatch(setCurrentUser({}));
    navigate("/");
  };

  return (
    <header>
      {currentUser.role === "Shopper" ? (
        <AppBar className={classes.shopperHeader}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      ) : (
        <span>
          {currentUser.role === "Admin" ? (
            <AppBar className={classes.adminHeader}>
              {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
          ) : (
            <AppBar className={classes.defaultHeader}>
              {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
          )}
        </span>
      )}
    </header>
  );
};

export default Header;
