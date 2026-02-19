import { ThemeToggle } from "@/app/theme/ThemeToggle";
import { AppBar, Box, Container } from "@mui/material";

export function Navbar() {
    return (
        <AppBar sx={{ height: "64px" }}>
            <Container maxWidth="xl" sx={{ justifyContent: "space-between" }}>
                <Box sx={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
                    <h2>NAvegacion</h2>
                    <ThemeToggle />
                </Box>
            </Container>
        </AppBar>
    );
}
