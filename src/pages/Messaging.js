import { store } from "../store";

import Chat from "../components/Chat";
import PhoneDialog from "../components/PhoneDialog";

import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

import "./styles.scss";

function Messaging() {
  const [state] = store.useState("auth");

  return (
    <div className="messaging">
      <Paper elevation={3} className="messaging__wrapper">
        <AppBar position="relative" className="messaging__bar">
          WhatsApp Bussiness Web
        </AppBar>

        <div className="messaging__fields">
          <Paper className="messaging__menu">
            {!state.phone ? (
              <div className="messaging__no-chats">No chats</div>
            ) : (
              <MenuList dense>
                {state.phone ? (
                  <MenuItem selected className="messaging__menu-item">
                    <ListItemText inset>
                      <b>
                        {"+7" +
                          state.phone.replace(
                            /(\d{1})(\d{3})(\d{3})(\d{4})/,
                            "+$1 ($2) $3-$4"
                          )}
                      </b>
                    </ListItemText>
                  </MenuItem>
                ) : null}
              </MenuList>
            )}
          </Paper>

          <Chat />
        </div>
      </Paper>
      <PhoneDialog />
    </div>
  );
}

export default Messaging;
