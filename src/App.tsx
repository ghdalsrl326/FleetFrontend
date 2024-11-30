import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";
import FleetDashboard from "components/FleetDashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FleetDashboard />
    </ThemeProvider>
  );
}

export default App;
