import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Header() {
  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="header-logo"
            data-testid="translate-logo-text"
          >
            Translate
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account settings"
              data-testid="account-icon"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
