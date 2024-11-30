import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StarColumnHeader = ({ onRefresh }: { onRefresh: () => void }) => (
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <IconButton size="small" onClick={onRefresh}>
      <RefreshIcon fontSize="small" />
    </IconButton>
  </Box>
);

const RobotCell = ({ robot, onAddRobot, locationId }: any) => {
  const theme = useTheme();

  if (!robot) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, height: "100%" }}
      >
        <FiberManualRecordIcon
          sx={{
            color: theme.palette.grey[500],
            fontSize: theme.typography.subtitle1.fontSize,
          }}
        />
        <Typography
          component="span"
          sx={{
            cursor: "pointer",
            color: theme.palette.primary.main,
            font: theme.typography.subtitle2,
            textDecoration: "underline",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => onAddRobot(locationId)}
        >
          Add
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: "100%" }}>
      <FiberManualRecordIcon
        sx={{
          fontSize: theme.typography.body1,
          color: robot.isOnline
            ? theme.palette.success.main
            : theme.palette.grey[500],
        }}
      />
      <Typography
        sx={{
          ...theme.typography.subtitle2,
          color: robot.isOnline
            ? theme.palette.grey[900]
            : theme.palette.grey[500],
        }}
      >
        {robot.id}
      </Typography>
    </Box>
  );
};

export const createColumns = ({
  onStarClick,
  onRefresh,
  onAddRobot,
  starredIds,
}: any) => [
  {
    field: "starred",
    headerName: "",
    width: 50,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => <StarColumnHeader onRefresh={onRefresh} />,
    renderCell: (params: any) => (
      <IconButton onClick={() => onStarClick(params.row.id)}>
        {starredIds.includes(params.row.id) ? (
          <StarIcon sx={{ color: "notice.main" }} />
        ) : (
          <StarBorderIcon />
        )}
      </IconButton>
    ),
  },
  {
    field: "name",
    headerName: "Locations",
    flex: 1,
    renderCell: (params: any) => (
      <Button
        sx={{
          backgroundColor: params.row.robot?.isOnline
            ? "secondary.main"
            : "grey.300",
          width: "100%",
          justifyContent: "space-between",
        }}
        color="secondary"
        variant="contained"
        endIcon={<ChevronRightIcon />}
      >
        {params.value}
      </Button>
    ),
  },
  {
    field: "robot",
    headerName: "Robots",
    flex: 1,
    renderCell: (params: any) => (
      <RobotCell
        robot={params.value}
        onAddRobot={onAddRobot}
        locationId={params.row.id}
      />
    ),
  },
];
