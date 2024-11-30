import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import FleetDashboard from "./components/FleetDashboard";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FleetDashboard />
    </ThemeProvider>
  );
}

export default App;
