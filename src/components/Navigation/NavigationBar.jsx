import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BusinessIcon from '@material-ui/icons/Business';
import { Link, Switch, Route } from "react-router-dom"
import Business from "../Business/Business"
import SearchIcon from '@material-ui/icons/Search';
import inputJson from "../../data";
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import InputIcon from '@material-ui/icons/Input';
import shipments from "../../Storage";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

/**
 * Load items from localstorage and return.
 *
 * @returns {Array}
 */
const initialDataLoad = () => {
  return JSON.parse(localStorage.getItem("businesses"))
}

function ResponsiveDrawer(props) {
  shipments.setShipments(initialDataLoad())
  const { propWindow } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [ data, setData ] = React.useState(shipments.getShipments())

  const savePressed = () => {
    localStorage.setItem("businesses", JSON.stringify(shipments.getShipments()))
  }

  const loadPressed = () => {
    shipments.setShipments(inputJson);
    localStorage.setItem("businesses", JSON.stringify(inputJson))
    setData(inputJson)
    window.location.reload()
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    propWindow !== undefined ? () => propWindow().document.body : undefined;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {data !== null ? data.map((business) => (
          <ListItem className={classes.linkStyle} component={Link} key={business.id} to={`/${business.id}`} >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={business.name} />
          </ListItem>
        )) : (
          <ListItem className={classes.linkStyle} >
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={"No Shipments"} />
          </ListItem>
        )}
      </List>
    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setData(inputJson.filter(business => business.name.toLowerCase().includes(inputValue)))
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={savePressed}>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <SaveIcon />
        </IconButton>
        <p>Save</p>
      </MenuItem>
      <MenuItem onClick={loadPressed}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
            <InputIcon />
        </IconButton>
        <p>Load</p>
      </MenuItem>
    </Menu>
  );
  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <SaveIcon onClick={handleMenuClose}>Save</SaveIcon>
      <InputIcon onClick={handleMenuClose}>Load</InputIcon>
    </Menu>
  );

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Cargo Planner
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(e) => {handleSearch(e)}}
              inputProps={{ 'aria-label': 'search' }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={savePressed}>
                <SaveIcon  />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={loadPressed}>
                <InputIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {data === null ?
          (
            <div style={{ width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
              <Typography variant={"h3"}>No Shipments Were Found.</Typography>
              <div>
                <Button variant="contained" color="primary"
                  onClick={loadPressed}>
                  <InputIcon />
                  <Typography style={{marginLeft: 10}}>Load Shipments</Typography>
                </Button>
              </div>
            </div>
          ) : (

            <Switch>
              <Route path={"/:id"} component={Business}/>
            </Switch>
          )
        }
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    padding: theme.spacing(3),
  },

  linkStyle: {
    textDecoration: "none"
  },
  margin: {
    marginLeft: "3em",
    color: "#fff"
  },
  grow: {
    flexGrow: 1,
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default ResponsiveDrawer;
