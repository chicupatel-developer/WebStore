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

import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Badge from "@material-ui/core/Badge";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/actions/productsActions";

import SearchBar from "material-ui-search-bar";

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

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 950
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

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
  }, [myShoppingCart]);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {webStoreLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

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
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{webStoreLogo}</div>
      </Toolbar>
    );
  };

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
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={(e) => doComponentRedirect(e, "Home")}
        >
          <HomeIcon /> Home
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
      </>
    );
  };

  const doComponentRedirect = (e, routePath) => {
    if (routePath === "Products") navigate("/");
    if (routePath === "Cart") navigate("/cart");
    if (routePath === "Home") navigate("/home");
  };

  return (
    <header>
      <AppBar className={classes.header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;
