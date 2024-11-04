import { Box, Typography, Container } from "@mui/material";

export default function EventSection() {
  return (
    <Box
      component="section"
      sx={{
        py: 2,
        backgroundColor: 'transparent'
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'primary.main',
            backgroundColor: 'white',
            borderRadius: 2,
            border: 2,
            borderColor: 'primary.main',
            py: 1,
            px: 3,
            width: 'fit-content',
            mx: 'auto',
            fontSize: { xs: '1.5rem', md: '2rem' },
            textTransform: 'uppercase',
          }}
        >
          Event
        </Typography>

        <Box 
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            }
          }}
        >
          {/* Event cards */}
        </Box>
      </Container>
    </Box>
  );
} 