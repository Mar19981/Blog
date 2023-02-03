import Paper from "@mui/material/Paper";

interface BackdropProps {
    children?: React.ReactNode
};

const Backdrop = ({children}: BackdropProps) => {
    return (
        <Paper sx={{width: "95vw", height: 900, padding: 2, overflowY: "scroll"}} elevation={2}  variant="outlined">
            {children}
        </Paper>
    )
}
export default Backdrop;