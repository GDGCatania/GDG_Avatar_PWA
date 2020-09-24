import { createMuiTheme } from "@material-ui/core/styles";
import { deepOrange, green } from "@material-ui/core/colors";

//todo choose the color
export const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: green
    },
    props: {
        MuiPaper: {
            elevation: 2,
        },
    },
});